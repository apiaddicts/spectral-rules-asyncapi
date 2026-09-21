/**
 * @param {object} document - The whole AsyncAPI document
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */
const CAMEL_CASE_PATTERN = /^[a-z][a-zA-Z0-9]*$/;
const EXTENSION_PREFIX = "x-";

const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

const format = (value) => (typeof value === "string" ? `'${value}'` : JSON.stringify(value));

const isVersion3Plus = (raw) => {
  if (raw === null || raw === undefined || typeof raw === "object") return false;
  const version = String(raw);
  return version.startsWith("3.0") || version.startsWith("3.1") || version.startsWith("3.2");
};

module.exports = (document, _options, context) => {
  const errors = [];
  if (!isObject(document)) {
    return errors;
  }

  if (!Object.prototype.hasOwnProperty.call(document, "asyncapi")) {
    return errors;
  }

  const report = (message, path) => errors.push({ message, path: [...context.path, ...path] });

  const checkOperationsMap = (operations, prefix) => {
    if (!isObject(operations)) return;
    for (const [operationKey, operation] of Object.entries(operations)) {
      if (!isObject(operation) || operationKey.startsWith(EXTENSION_PREFIX)) continue;
      if (!CAMEL_CASE_PATTERN.test(operationKey)) {
        report(
          `The operation key must follow camelCase naming convention (e.g. 'solicitarBeca'). Found: '${operationKey}'.`,
          [...prefix, operationKey]
        );
      }
    }
  };

  const checkOperation = (operation, operationPath) => {
    if (!isObject(operation)) return;

    const operationId = operation.operationId;
    if (operationId === undefined || operationId === null) {
      report("Operation must declare an 'operationId'.", operationPath);
      return;
    }

    if (typeof operationId !== "string" || !CAMEL_CASE_PATTERN.test(operationId)) {
      report(
        `'operationId' must follow camelCase naming convention (e.g. 'solicitarBeca'). Found: ${format(operationId)}.`,
        [...operationPath, "operationId"]
      );
    }
  };

  const checkCallbacksMap = (callbacks, prefix) => {
    if (!isObject(callbacks)) return;
    for (const [callbackKey, callback] of Object.entries(callbacks)) {
      if (!isObject(callback) || callbackKey.startsWith(EXTENSION_PREFIX)) continue;
      checkOperation(callback.publish, [...prefix, callbackKey, "publish"]);
      checkOperation(callback.subscribe, [...prefix, callbackKey, "subscribe"]);
    }
  };

  const checkChannelsMap = (channels, prefix) => {
    if (!isObject(channels)) return;
    for (const [channelKey, channel] of Object.entries(channels)) {
      if (!isObject(channel) || channelKey.startsWith(EXTENSION_PREFIX)) continue;
      checkOperation(channel.publish, [...prefix, channelKey, "publish"]);
      checkOperation(channel.subscribe, [...prefix, channelKey, "subscribe"]);
      checkCallbacksMap(channel.callbacks, [...prefix, channelKey, "callbacks"]);
    }
  };

  const components = isObject(document.components) ? document.components : undefined;

  if (isVersion3Plus(document.asyncapi)) {
    checkOperationsMap(document.operations, ["operations"]);
    if (components) {
      checkOperationsMap(components.operations, ["components", "operations"]);
    }
  } else {
    checkChannelsMap(document.channels, ["channels"]);
    if (components) {
      checkChannelsMap(components.channels, ["components", "channels"]);
    }
  }

  return errors;
};
