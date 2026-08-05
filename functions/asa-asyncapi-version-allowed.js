/**
 * @param {object} document - The whole AsyncAPI document (given: "$")
 * @param {object} options - Configuration options
 * @param {string} options.allowedVersions - Comma-separated list of allowed versions
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */

const DEFAULT_ALLOWED_VERSIONS = "2.6.0";

module.exports = (document, options, context) => {
  const errors = [];
  if (!document || typeof document !== "object") {
    return errors;
  }

  const configured =
    options && options.allowedVersions != null
      ? options.allowedVersions
      : DEFAULT_ALLOWED_VERSIONS;
  const allowed = String(configured)
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s !== "");

  const raw = document.asyncapi;
  if (raw === null || raw === undefined) {
    return errors;
  }

  const version = String(raw);
  if (version.trim() === "") {
    return errors;
  }

  if (!allowed.includes(version)) {
    errors.push({
      message:
        "The asyncapi version must be one of the versions allowed by the organization",
      path: [...context.path, "asyncapi"],
    });
  }

  return errors;
};
