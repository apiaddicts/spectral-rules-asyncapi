/**
 * @param {object} given - The root AsyncAPI document ($)
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */

const MESSAGE =
  "Each message must declare a 'contentType' unless it is an Avro message";
const AVRO_SCHEMA_FORMAT_PREFIX = "application/vnd.apache.avro";

function isObject(value) {
  return value !== null && typeof value === "object";
}

function hasAvroSchemaFormat(node) {
  return (
    isObject(node) &&
    typeof node.schemaFormat === "string" &&
    node.schemaFormat.includes(AVRO_SCHEMA_FORMAT_PREFIX)
  );
}

function isAvroMessage(message) {
  return hasAvroSchemaFormat(message) || hasAvroSchemaFormat(message.payload);
}

function hasContentType(message) {
  return message.contentType !== undefined && message.contentType !== null;
}

module.exports = (given, _options, context) => {
  const errors = [];

  if (!isObject(given)) {
    return errors;
  }

  const isV3 =
    typeof given.asyncapi === "string" && given.asyncapi.trim().startsWith("3.");

  function validateMessage(message, messagePath, allowOneOf) {
    if (!isObject(message)) {
      return;
    }
    if (message.$ref !== undefined) {
      return;
    }
    if (allowOneOf && Array.isArray(message.oneOf)) {
      message.oneOf.forEach((member, idx) => {
        validateMessage(member, [...messagePath, "oneOf", idx], allowOneOf);
      });
      return;
    }
    if (!hasContentType(message) && !isAvroMessage(message)) {
      errors.push({ message: MESSAGE, path: messagePath });
    }
  }

  const channels = given.channels;
  if (isObject(channels)) {
    Object.keys(channels).forEach((channelName) => {
      const channel = channels[channelName];
      if (!isObject(channel)) {
        return;
      }
      if (isV3) {
        const messages = channel.messages;
        if (isObject(messages)) {
          Object.keys(messages).forEach((msgName) => {
            validateMessage(
              messages[msgName],
              [...context.path, "channels", channelName, "messages", msgName],
              false
            );
          });
        }
      } else {
        ["publish", "subscribe"].forEach((op) => {
          const operation = channel[op];
          if (isObject(operation) && operation.message !== undefined) {
            validateMessage(
              operation.message,
              [...context.path, "channels", channelName, op, "message"],
              true
            );
          }
        });
      }
    });
  }

  const components = given.components;
  if (isObject(components) && isObject(components.messages)) {
    const compMessages = components.messages;
    Object.keys(compMessages).forEach((msgName) => {
      validateMessage(
        compMessages[msgName],
        [...context.path, "components", "messages", msgName],
        false
      );
    });
  }

  return errors;
};
