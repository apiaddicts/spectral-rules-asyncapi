/**
 * @param {object} channel - The channel object (AsyncAPI 2.x or 3.x)
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */

const RETRY_TOPIC_PATTERN =
  /^[a-z0-9]{1,63}(?:-[a-z0-9]{1,63}){0,10}(?:\.[a-z0-9]{1,63}(?:-[a-z0-9]{1,63}){0,10}){1,20}\.retry\.\d{1,10}$/;

module.exports = (channel, _options, context) => {
  const channelKey = context.path[context.path.length - 1];
  const isObject = channel !== null && typeof channel === "object";
  const hasAddressField = isObject && Object.prototype.hasOwnProperty.call(channel, "address");

  let channelName;
  let path;

  if (hasAddressField) {
    if (channel.address == null) {
      return [];
    }
    channelName = channel.address;
    path = [...context.path, "address"];
  } else {
    channelName = channelKey;
    path = [...context.path];
  }

  if (typeof channelName !== "string" || !channelName.includes(".retry.")) {
    return [];
  }

  if (RETRY_TOPIC_PATTERN.test(channelName)) {
    return [];
  }

  return [
    {
      message: `Channel name '${channelName}' contains '.retry.' but does not follow the required pattern '<topicOriginal>.<consumerGroup>.retry.<n>' (e.g. 'beca.cmd.alumnos.solicitud.beca.grupo1.retry.1') required by Spring for automatic retry reprocessing.`,
      path,
    },
  ];
};
