/**
 * @param {object} given - The root AsyncAPI document
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */

const ERROR_TOPIC_PATTERN =
  /^[a-z0-9]{1,63}(?:-[a-z0-9]{1,63}){0,10}(?:\.[a-z0-9]{1,63}(?:-[a-z0-9]{1,63}){0,10}){0,20}\.error\.\d{1,10}$/;

function isVersion3Plus(document) {
  const version = typeof document.asyncapi === "string" ? document.asyncapi.trim() : "";
  return version.startsWith("3.");
}

module.exports = (given, _options, context) => {
  const error = {
    message:
      "No channel is documented as an error topic. At least one channel must follow the pattern '<topicOriginal>.[<consumerGroup>.]error.<n>' (e.g. 'beca.cmd.alumnos.solicitud.beca.grupo1.error.1') required by Spring.",
    path: [...context.path, "channels"],
  };

  if (!given || !given.channels) {
    return [error];
  }

  const isV3Plus = isVersion3Plus(given);

  const hasErrorTopic = Object.entries(given.channels).some(([channelName, channel]) => {
    let topicName;
    if (isV3Plus) {
      if (!channel || typeof channel !== "object" || channel.address == null) {
        return false;
      }
      topicName = channel.address;
    } else {
      topicName = channelName;
    }
    return typeof topicName === "string" && ERROR_TOPIC_PATTERN.test(topicName);
  });

  return hasErrorTopic ? [] : [error];
};
