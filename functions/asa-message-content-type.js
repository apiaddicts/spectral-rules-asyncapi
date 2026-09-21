/**
 * @param {object} given - The root AsyncAPI document ($)
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */

const MESSAGE =
  "Each message must declare a 'contentType' unless it is an Avro message";
const AVRO_SCHEMA_FORMAT_PREFIX = "application/vnd.apache.avro";

const CONTENT_TYPE_ABSENT = 0;
const CONTENT_TYPE_NULL = 1;
const CONTENT_TYPE_DECLARED = 2;

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

function contentTypeState(node) {
  if (!isObject(node) || node.contentType === undefined) {
    return CONTENT_TYPE_ABSENT;
  }
  return node.contentType === null ? CONTENT_TYPE_NULL : CONTENT_TYPE_DECLARED;
}

module.exports = (given, _options, context) => {
  const errors = [];

  if (!isObject(given)) {
    return errors;
  }

  const isV3 =
    typeof given.asyncapi === "string" && given.asyncapi.trim().startsWith("3.");

  function resolveLocalRef(node) {
    const seen = new Set();
    let current = node;
    while (isObject(current) && typeof current.$ref === "string") {
      const ref = current.$ref;
      if (!ref.startsWith("#/") || seen.has(ref)) {
        return undefined;
      }
      seen.add(ref);
      current = ref
        .slice(2)
        .split("/")
        .map((token) => token.replace(/~1/g, "/").replace(/~0/g, "~"))
        .reduce(
          (acc, token) => (isObject(acc) ? acc[token] : undefined),
          given
        );
    }
    return current;
  }

  function hasContentType(message) {
    let state = contentTypeState(message);
    if (state !== CONTENT_TYPE_ABSENT) {
      return state === CONTENT_TYPE_DECLARED;
    }
    if (!Array.isArray(message.traits)) {
      return false;
    }
    message.traits.forEach((trait) => {
      const traitState = contentTypeState(resolveLocalRef(trait));
      if (traitState !== CONTENT_TYPE_ABSENT) {
        state = traitState;
      }
    });
    return state === CONTENT_TYPE_DECLARED;
  }

  function validateMessage(message, messagePath) {
    if (!isObject(message)) {
      return;
    }
    if (message.$ref !== undefined) {
      return;
    }
    if (Array.isArray(message.oneOf)) {
      message.oneOf.forEach((member, idx) => {
        validateMessage(member, [...messagePath, "oneOf", idx]);
      });
      return;
    }
    if (!hasContentType(message) && !isAvroMessage(message)) {
      errors.push({ message: MESSAGE, path: messagePath });
    }
  }

  function validateChannel(channel, channelPath) {
    if (!isObject(channel) || channel.$ref !== undefined) {
      return;
    }
    if (isV3) {
      const messages = channel.messages;
      if (isObject(messages)) {
        Object.keys(messages).forEach((msgName) => {
          validateMessage(messages[msgName], [
            ...channelPath,
            "messages",
            msgName,
          ]);
        });
      }
      return;
    }
    ["publish", "subscribe"].forEach((op) => {
      const operation = channel[op];
      if (isObject(operation) && operation.message !== undefined) {
        validateMessage(operation.message, [...channelPath, op, "message"]);
      }
    });
  }

  function validateChannels(channels, channelsPath) {
    if (!isObject(channels)) {
      return;
    }
    Object.keys(channels).forEach((channelName) => {
      validateChannel(channels[channelName], [...channelsPath, channelName]);
    });
  }

  validateChannels(given.channels, [...context.path, "channels"]);

  const components = given.components;
  if (isObject(components)) {
    validateChannels(components.channels, [
      ...context.path,
      "components",
      "channels",
    ]);
    if (isObject(components.messages)) {
      const compMessages = components.messages;
      Object.keys(compMessages).forEach((msgName) => {
        validateMessage(compMessages[msgName], [
          ...context.path,
          "components",
          "messages",
          msgName,
        ]);
      });
    }
  }

  return errors;
};
