/**
 * @param {object} document - The whole AsyncAPI document (given: "$")
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */

const FUNCTION_NAME = "x-scs-function-name";

module.exports = (document, _options, context) => {
  const errors = [];
  if (!document || typeof document !== "object") {
    return errors;
  }

  const groups = new Map();

  const recordOperation = (operation, isProduce, basePath) => {
    if (!operation || typeof operation !== "object" || operation.$ref) return;
    if (!Object.prototype.hasOwnProperty.call(operation, FUNCTION_NAME)) return;
    const rawValue = operation[FUNCTION_NAME];
    if (rawValue === null || rawValue === undefined) return;
    const value = String(rawValue);
    if (value.trim() === "") return;

    let group = groups.get(value);
    if (!group) {
      group = { produceNodes: [], consumeNodes: [] };
      groups.set(value, group);
    }
    const nodePath = [...basePath, FUNCTION_NAME];
    if (isProduce) {
      group.produceNodes.push(nodePath);
    } else {
      group.consumeNodes.push(nodePath);
    }
  };

  const isV3 =
    typeof document.asyncapi === "string" && document.asyncapi.startsWith("3.");

  if (isV3) {
    const operations = document.operations;
    if (operations && typeof operations === "object") {
      for (const [operationName, operation] of Object.entries(operations)) {
        if (!operation || typeof operation !== "object") continue;
        const action = operation.action;
        if (action === "send") {
          recordOperation(operation, true, ["operations", operationName]);
        } else if (action === "receive") {
          recordOperation(operation, false, ["operations", operationName]);
        }
      }
    }
  } else {
    const channels = document.channels;
    if (channels && typeof channels === "object") {
      for (const [channelName, channel] of Object.entries(channels)) {
        if (!channel || typeof channel !== "object") continue;
        recordOperation(channel.publish, true, ["channels", channelName, "publish"]);
        recordOperation(channel.subscribe, false, ["channels", channelName, "subscribe"]);
      }
    }
  }

  for (const [value, group] of groups) {
    const paired = Math.min(group.produceNodes.length, group.consumeNodes.length);
    let unpaired = [];
    if (group.produceNodes.length > group.consumeNodes.length) {
      unpaired = group.produceNodes.slice(paired);
    } else if (group.consumeNodes.length > group.produceNodes.length) {
      unpaired = group.consumeNodes.slice(paired);
    }
    for (const nodePath of unpaired) {
      errors.push({
        message: `The x-scs-function-name '${value}' must be paired one-to-one between a publish/send and a subscribe/receive operation.`,
        path: [...context.path, ...nodePath],
      });
    }
  }

  return errors;
};
