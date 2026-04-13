/**
 * AAR013 - DuplicateOperationID
 * Validates that there are no duplicate operationId values across all channels.
 *
 * @param {object} given - The root AsyncAPI document
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */
module.exports = (given, _options, context) => {
  const errors = [];

  if (!given || !given.channels) {
    return errors;
  }

  const operationIds = new Map(); // operationId -> first occurrence path

  for (const [channelName, channel] of Object.entries(given.channels)) {
    const operations = ["publish", "subscribe"];

    for (const op of operations) {
      if (channel[op] && channel[op].operationId) {
        const opId = channel[op].operationId;
        const currentPath = `channels.${channelName}.${op}.operationId`;

        if (operationIds.has(opId)) {
          const firstPath = operationIds.get(opId);
          errors.push({
            message: `Duplicate operationId '${opId}' found. First defined at '${firstPath}'.`,
            path: [
              ...context.path,
              "channels",
              channelName,
              op,
              "operationId",
            ],
          });
        } else {
          operationIds.set(opId, currentPath);
        }
      }
    }
  }

  return errors;
};
