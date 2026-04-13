/**
 * AAR032 - NumericParameterIntegrity
 * Validates that numeric parameters have minimum, maximum, or format restriction.
 *
 * @param {object} given - The property schema object
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */
module.exports = (given, _options, context) => {
  const errors = [];

  if (!given || typeof given !== "object") {
    return errors;
  }

  // Only check numeric types
  if (given.type !== "integer" && given.type !== "number") {
    return errors;
  }

  // Skip if it's a $ref
  if (given.$ref) {
    return errors;
  }

  const hasMinimum =
    given.minimum !== undefined || given.exclusiveMinimum !== undefined;
  const hasMaximum =
    given.maximum !== undefined || given.exclusiveMaximum !== undefined;
  const hasFormat = !!given.format;
  const hasEnum = Array.isArray(given.enum) && given.enum.length > 0;
  const hasConst = given.const !== undefined;

  if (!hasMinimum && !hasMaximum && !hasFormat && !hasEnum && !hasConst) {
    errors.push({
      message: `Numeric property of type '${given.type}' should have at least one of: minimum, maximum, format, enum, or const restriction.`,
      path: context.path,
    });
  }

  return errors;
};
