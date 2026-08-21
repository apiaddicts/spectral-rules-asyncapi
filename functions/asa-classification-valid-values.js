/**
 * @param {object} channel - The channel object (AsyncAPI 2.x or 3.x)
 * @param {object} options - Function options, e.g. { validValues: ["cdc", "cmd", "sys"] }
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */
const DEFAULT_VALID_VALUES = ["cdc", "cmd", "sys"];

module.exports = (channel, options, context) => {
  const channelKey = context.path[context.path.length - 1];
  const isObject = channel !== null && typeof channel === "object";
  const hasAddressField = isObject && Object.prototype.hasOwnProperty.call(channel, "address");

  let channelName;
  let path;

  if (hasAddressField) {
    if (channel.address === null) {
      return [];
    }
    channelName = channel.address;
    path = [...context.path, "address"];
  } else {
    channelName = channelKey;
    path = [...context.path];
  }

  if (channelName === undefined) {
    return [];
  }

  channelName = String(channelName);

  const validValues = (options && options.validValues) || DEFAULT_VALID_VALUES;
  const classification = channelName.split(".")[1];

  if (!classification || !validValues.includes(classification)) {
    return [
      {
        message: `Channel name '${channelName}' has an invalid classification segment '${classification || ""}'. The second segment must be one of: ${validValues.join(", ")}.`,
        path,
      },
    ];
  }

  return [];
};
