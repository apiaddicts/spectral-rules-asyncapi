/**
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

  if (given.type !== "integer" && given.type !== "number") {
    return errors;
  }

  if (given.$ref) {
    return errors;
  }

  const format = given.format;
  if (format === undefined || format === null) {
    return errors;
  }

  const validFormats = ["int32", "int64", "float", "double"];
  if (!validFormats.includes(format)) {
    errors.push({
      message:
        "Numeric property must specify a valid 'format' (int32, int64, float, double).",
      path: context.path,
    });
  }

  return errors;
};
