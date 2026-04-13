/**
 * AAR036 - BadDescription
 * Validates that descriptions begin with a capital letter and end with a period.
 *
 * @param {object} given - The object containing a 'description' field
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */
module.exports = (given, _options, context) => {
  const errors = [];

  if (!given || typeof given !== "object") {
    return errors;
  }

  const description = given.description;

  // If no description, skip (AAR029 handles missing descriptions)
  if (!description || typeof description !== "string") {
    return errors;
  }

  const trimmed = description.trim();

  if (trimmed.length === 0) {
    return errors;
  }

  // Check starts with uppercase
  if (!/^[A-Z]/.test(trimmed)) {
    errors.push({
      message: `Description must begin with a capital letter. Found: "${trimmed.substring(0, 30)}..."`,
      path: [...context.path, "description"],
    });
  }

  // Check ends with period
  if (!/\.\s*$/.test(trimmed)) {
    errors.push({
      message: `Description must end with a period. Found: "...${trimmed.substring(Math.max(0, trimmed.length - 30))}"`,
      path: [...context.path, "description"],
    });
  }

  return errors;
};
