/**
 * @param {object} document - The whole AsyncAPI document (given: "$")
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */

const GROUP_EXTENSION = "x-scs-group";

const hasGroup = (operation) => {
  if (Object.prototype.hasOwnProperty.call(operation, GROUP_EXTENSION)) {
    const rawGroup = operation[GROUP_EXTENSION];
    if (
      rawGroup !== null &&
      rawGroup !== undefined &&
      typeof rawGroup !== "object" &&
      String(rawGroup).trim() !== ""
    ) {
      return true;
    }
  }

  const bindings = operation.bindings;
  if (bindings && typeof bindings === "object") {
    const kafka = bindings.kafka;
    if (kafka && typeof kafka === "object" &&
        Object.prototype.hasOwnProperty.call(kafka, "groupId")) {
      const groupId = kafka.groupId;
      if (groupId !== null && groupId !== undefined) {
        if (typeof groupId === "object") return true;
        if (String(groupId).trim() !== "") return true;
      }
    }
  }

  return false;
};

module.exports = (document, _options, context) => {
  const errors = [];
  if (!document || typeof document !== "object") {
    return errors;
  }

  const check = (operation, basePath) => {
    if (!operation || typeof operation !== "object" || operation.$ref) return;
    if (hasGroup(operation)) return;
    errors.push({
      message:
        "The consuming operation must declare a consumer group via 'x-scs-group' or 'bindings.kafka.groupId'.",
      path: [...context.path, ...basePath],
    });
  };

  const checkOperationsMap = (operations, prefix) => {
    if (!operations || typeof operations !== "object") return;
    for (const [operationName, operation] of Object.entries(operations)) {
      if (!operation || typeof operation !== "object") continue;
      if (operation.action === "receive") {
        check(operation, [...prefix, operationName]);
      }
    }
  };

  const checkChannelsMap = (channels, prefix) => {
    if (!channels || typeof channels !== "object") return;
    for (const [channelName, channel] of Object.entries(channels)) {
      if (!channel || typeof channel !== "object") continue;
      check(channel.subscribe, [...prefix, channelName, "subscribe"]);
    }
  };

  const isV3 =
    typeof document.asyncapi === "string" && document.asyncapi.startsWith("3.");

  const components =
    document.components && typeof document.components === "object"
      ? document.components
      : undefined;

  if (isV3) {
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
