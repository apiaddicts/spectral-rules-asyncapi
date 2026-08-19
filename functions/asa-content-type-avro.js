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

  const isV3 =
    typeof document.asyncapi === "string" && document.asyncapi.startsWith("3.");

  const check = (value, path) => {
    if (value === null || value === undefined) return;
    if (typeof value !== "string" || !AVRO_CONTENT_TYPE.test(value)) {
      errors.push({
        message: `contentType '${value}' must match 'application/*+avro'.`,
        path: [...context.path, ...path],
      });
    }
  };

  if (Object.prototype.hasOwnProperty.call(document, "defaultContentType")) {
    check(document.defaultContentType, ["defaultContentType"]);
  }

  const checkMessage = (message, basePath) => {
    if (!message || typeof message !== "object" || message.$ref) {
      return;
    }
    if (!isV3 && Array.isArray(message.oneOf)) {
      message.oneOf.forEach((member, index) =>
        checkMessage(member, [...basePath, "oneOf", index])
      );
      return;
    }
    if (Object.prototype.hasOwnProperty.call(message, "contentType")) {
      check(message.contentType, [...basePath, "contentType"]);
    }
  };

  const channels = document.channels;
  if (channels && typeof channels === "object") {
    for (const [channelName, channel] of Object.entries(channels)) {
      if (!channel || typeof channel !== "object") continue;
      if (isV3) {
        const messages = channel.messages;
        if (messages && typeof messages === "object") {
          for (const [messageName, message] of Object.entries(messages)) {
            checkMessage(message, ["channels", channelName, "messages", messageName]);
          }
        }
      } else {
        for (const operationName of ["publish", "subscribe"]) {
          const operation = channel[operationName];
          if (operation && typeof operation === "object" && operation.message) {
            checkMessage(operation.message, [
              "channels",
              channelName,
              operationName,
              "message",
            ]);
          }
        }
      }
    }
  }

  const componentMessages =
    document.components && document.components.messages;
  if (componentMessages && typeof componentMessages === "object") {
    for (const [messageName, message] of Object.entries(componentMessages)) {
      checkMessage(message, ["components", "messages", messageName]);
    }
  }

  return errors;
};
