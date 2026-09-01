/**
 * @param {object} document - The whole AsyncAPI document (given: "$")
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */

const AVRO_CONTENT_TYPE = /^application\/.{1,255}\+avro$/;

module.exports = (document, _options, context) => {
  const errors = [];
  if (!document || typeof document !== "object") {
    return errors;
  }

  const isObject = (value) => value !== null && typeof value === "object";
  const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

  const check = (value, path) => {
    if (value === null || value === undefined) return;
    if (typeof value !== "string" || !AVRO_CONTENT_TYPE.test(value)) {
      errors.push({
        message: `contentType '${value}' must match 'application/*+avro'.`,
        path: [...context.path, ...path],
      });
    }
  };

  const effectiveContentType = (message) => {
    if (has(message, "contentType")) {
      return { value: message.contentType, path: ["contentType"] };
    }
    if (Array.isArray(message.traits)) {
      let effective = null;
      message.traits.forEach((trait, index) => {
        if (isObject(trait) && !trait.$ref && has(trait, "contentType")) {
          effective = { value: trait.contentType, path: ["traits", index, "contentType"] };
        }
      });
      return effective;
    }
    return null;
  };

  const checkMessage = (message, basePath) => {
    if (!isObject(message) || message.$ref) {
      return;
    }
    if (Array.isArray(message.oneOf)) {
      message.oneOf.forEach((member, index) =>
        checkMessage(member, [...basePath, "oneOf", index])
      );
      return;
    }
    const effective = effectiveContentType(message);
    if (effective) {
      check(effective.value, [...basePath, ...effective.path]);
    }
  };

  const checkChannel = (channel, basePath) => {
    if (!isObject(channel)) return;
    if (isObject(channel.messages)) {
      for (const [messageName, message] of Object.entries(channel.messages)) {
        checkMessage(message, [...basePath, "messages", messageName]);
      }
    }
    for (const operationName of ["publish", "subscribe"]) {
      const operation = channel[operationName];
      if (isObject(operation) && operation.message) {
        checkMessage(operation.message, [...basePath, operationName, "message"]);
      }
    }
    if (isObject(channel.callbacks)) {
      for (const [callbackName, callback] of Object.entries(channel.callbacks)) {
        checkChannel(callback, [...basePath, "callbacks", callbackName]);
      }
    }
  };

  if (has(document, "defaultContentType")) {
    check(document.defaultContentType, ["defaultContentType"]);
  }

  if (isObject(document.channels)) {
    for (const [channelName, channel] of Object.entries(document.channels)) {
      checkChannel(channel, ["channels", channelName]);
    }
  }

  const components = document.components;
  if (isObject(components)) {
    if (isObject(components.channels)) {
      for (const [channelName, channel] of Object.entries(components.channels)) {
        checkChannel(channel, ["components", "channels", channelName]);
      }
    }
    if (isObject(components.messages)) {
      for (const [messageName, message] of Object.entries(components.messages)) {
        checkMessage(message, ["components", "messages", messageName]);
      }
    }
  }

  return errors;
};
