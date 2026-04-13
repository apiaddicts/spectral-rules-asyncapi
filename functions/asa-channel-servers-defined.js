/**
 * AAR040 - DefinedChannelServers
 * Validates that channel servers reference servers defined in the root servers object.
 *
 * @param {object} given - The root AsyncAPI document
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */
module.exports = (given, _options, context) => {
  const errors = [];

  if (!given || typeof given !== "object") {
    return errors;
  }

  const definedServers = given.servers
    ? Object.keys(given.servers)
    : [];
  const channels = given.channels;

  if (!channels || typeof channels !== "object") {
    return errors;
  }

  for (const [channelName, channel] of Object.entries(channels)) {
    if (!channel || typeof channel !== "object") {
      continue;
    }

    // Check channel-level servers array (AsyncAPI 2.x)
    if (Array.isArray(channel.servers)) {
      channel.servers.forEach((serverRef, idx) => {
        if (typeof serverRef === "string" && !definedServers.includes(serverRef)) {
          errors.push({
            message: `Channel '${channelName}' references server '${serverRef}' which is not defined in the root 'servers' object. Available servers: ${definedServers.join(", ") || "none"}.`,
            path: [
              ...context.path,
              "channels",
              channelName,
              "servers",
              idx,
            ],
          });
        }
      });
    }
  }

  return errors;
};
