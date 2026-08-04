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

  const record = (operation, isProduce, basePath) => {
    if (!operation || typeof operation !== "object" || operation.$ref) return;
    if (!Object.prototype.hasOwnProperty.call(operation, FUNCTION_NAME)) return;
    const rawValue = operation[FUNCTION_NAME];
    if (rawValue === null || rawValue === undefined) return;
    const value = String(rawValue);
    if (value.trim() === "") return;

    let group = groups.get(value);
    if (!group) {
      group = { hasProduce: false, hasConsume: false, nodes: [] };
      groups.set(value, group);
    }
    if (isProduce) {
      group.hasProduce = true;
    } else {
      group.hasConsume = true;
    }
    group.nodes.push([...basePath, FUNCTION_NAME]);
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
          record(operation, true, ["operations", operationName]);
        } else if (action === "receive") {
          record(operation, false, ["operations", operationName]);
        }
      }
    }
  } else {
    const channels = document.channels;
    if (channels && typeof channels === "object") {
      for (const [channelName, channel] of Object.entries(channels)) {
        if (!channel || typeof channel !== "object") continue;
        record(channel.publish, true, ["channels", channelName, "publish"]);
        record(channel.subscribe, false, ["channels", channelName, "subscribe"]);
      }
    }
  }

  for (const [value, group] of groups) {
    if (!group.hasProduce || !group.hasConsume) {
      for (const path of group.nodes) {
        errors.push({
          message: `The x-scs-function-name '${value}' must be shared by both a publish/send and a subscribe/receive operation.`,
          path: [...context.path, ...path],
        });
      }
    }
  }

  return errors;
};
