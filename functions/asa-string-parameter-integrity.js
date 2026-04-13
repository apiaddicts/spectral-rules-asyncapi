/**
 * AAR033 - StringParameterIntegrity
 * Validates that string parameters have minLength, maxLength, pattern, or enum restriction.
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

  // Only check string types
  if (given.type !== "string") {
    return errors;
  }

  // Skip if it's a $ref
  if (given.$ref) {
    return errors;
  }

  // Skip format-only strings like date, date-time, email, uri, etc.
  const wellKnownFormats = [
    "date",
    "date-time",
    "time",
    "email",
    "idn-email",
    "hostname",
    "idn-hostname",
    "ipv4",
    "ipv6",
    "uri",
    "uri-reference",
    "iri",
    "iri-reference",
    "uuid",
    "json-pointer",
    "relative-json-pointer",
    "regex",
    "binary",
    "byte",
    "password",
  ];

  if (given.format && wellKnownFormats.includes(given.format)) {
    return errors;
  }

  const hasMinLength = given.minLength !== undefined;
  const hasMaxLength = given.maxLength !== undefined;
  const hasPattern = !!given.pattern;
  const hasEnum = Array.isArray(given.enum) && given.enum.length > 0;
  const hasConst = given.const !== undefined;
  const hasFormat = !!given.format;

  if (
    !hasMinLength &&
    !hasMaxLength &&
    !hasPattern &&
    !hasEnum &&
    !hasConst &&
    !hasFormat
  ) {
    errors.push({
      message:
        "String property should have at least one of: minLength, maxLength, pattern, enum, const, or format restriction.",
      path: context.path,
    });
  }

  return errors;
};
