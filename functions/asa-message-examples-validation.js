/**
 * AAR024 / AAR031 - MessageValidation / MessageExamples
 * Validates that message examples are present and structurally consistent
 * with the declared payload schema.
 *
 * @param {object} given - The message object
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */
module.exports = (given, _options, context) => {
  const errors = [];

  if (!given || typeof given !== "object") {
    return errors;
  }

  // Handle oneOf messages
  if (given.oneOf && Array.isArray(given.oneOf)) {
    given.oneOf.forEach((msg, idx) => {
      const msgErrors = validateMessage(msg, [...context.path, "oneOf", idx]);
      errors.push(...msgErrors);
    });
    return errors;
  }

  const msgErrors = validateMessage(given, context.path);
  errors.push(...msgErrors);

  return errors;
};

/**
 * Validate a single message object.
 */
function validateMessage(message, basePath) {
  const errors = [];

  if (!message || typeof message !== "object") {
    return errors;
  }

  // Check that payload is defined
  if (!message.payload) {
    errors.push({
      message:
        "Message should define a 'payload' schema to describe the message content.",
      path: [...basePath, "payload"],
    });
    return errors;
  }

  // Validate examples against payload schema if examples exist
  if (message.examples && Array.isArray(message.examples)) {
    message.examples.forEach((example, idx) => {
      if (!example.payload) {
        errors.push({
          message: `Example at index ${idx} should include a 'payload' matching the message schema.`,
          path: [...basePath, "examples", idx, "payload"],
        });
      }

      // Check that example headers exist if the message defines headers
      if (message.headers && !example.headers) {
        errors.push({
          message: `Example at index ${idx} should include 'headers' matching the message headers schema.`,
          path: [...basePath, "examples", idx, "headers"],
        });
      }

      // Basic structural validation: check example payload keys match schema
      if (
        example.payload &&
        message.payload.properties &&
        typeof example.payload === "object"
      ) {
        const schemaKeys = Object.keys(message.payload.properties);
        const exampleKeys = Object.keys(example.payload);
        const unknownKeys = exampleKeys.filter(
          (k) => !schemaKeys.includes(k)
        );

        if (unknownKeys.length > 0) {
          errors.push({
            message: `Example at index ${idx} contains keys not defined in payload schema: ${unknownKeys.join(", ")}.`,
            path: [...basePath, "examples", idx, "payload"],
          });
        }
      }
    });
  }

  return errors;
}
