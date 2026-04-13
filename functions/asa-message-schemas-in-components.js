/**
 * AAR026 - MessageSchemas
 * Validates that message schemas reference components rather than being inline.
 *
 * @param {object} given - The message object at operation level
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */
module.exports = (given, _options, context) => {
  const errors = [];

  if (!given || typeof given !== "object") {
    return errors;
  }

  // If the message uses $ref, it's fine (references components)
  if (given.$ref) {
    return errors;
  }

  // Handle oneOf messages
  if (given.oneOf && Array.isArray(given.oneOf)) {
    given.oneOf.forEach((msg, idx) => {
      if (msg && !msg.$ref) {
        errors.push({
          message: `Message at index ${idx} in oneOf should use a $ref to a message defined in 'components.messages' for reusability.`,
          path: [...context.path, "oneOf", idx],
        });
      }
    });
    return errors;
  }

  // If message has a payload defined inline (not via $ref), recommend components
  if (given.payload && !given.payload.$ref) {
    errors.push({
      message:
        "Message schema is defined inline. It is recommended to define message schemas in 'components.messages' and reference them with $ref for reusability.",
      path: context.path,
    });
  }

  return errors;
};
