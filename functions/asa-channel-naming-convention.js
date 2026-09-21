/**
 * @param {object} channel - The channel object (AsyncAPI 2.x or 3.x)
 * @param {object} options - Function options, e.g. { pattern: "<regex>" }
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */
const DEFAULT_PATTERN =
  "^[a-z0-9]+(?:-[a-z0-9]+)*(?:\\.[a-z0-9]+(?:-[a-z0-9]+)*){4}(?:\\.[a-z0-9]+(?:-[a-z0-9]+)*)?$";

module.exports = (channel, options, context) => {
  if (!channel || typeof channel !== "object") {
    return [];
  }

  const channelKey = context.path[context.path.length - 1];
  const hasAddressField = Object.prototype.hasOwnProperty.call(channel, "address");

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

  const patternStr = (options && options.pattern) || DEFAULT_PATTERN;
  const pattern = new RegExp(patternStr);

  if (typeof channelName !== "string" || !pattern.test(channelName)) {
    return [
      {
        message: `Channel name '${channelName}' does not follow the corporate naming convention '<cod_poaps>.<classification>.<domain>.<origin>.<scope>[.<version>]' (lowercase alphanumeric segments separated by dots, hyphen-joined words within a segment, no underscores).`,
        path,
      },
    ];
  }

  return [];
};
