/**
 * @param {*} references - The value found at the x-payload-references key
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */
const REQUIRED_FIELDS = ["subject", "ref", "referenceName"];

function isInvalidValue(value) {
  if (value === null || typeof value === "object") {
    return true;
  }
  if (typeof value === "string") {
    return value.trim() === "";
  }
  return false;
}

module.exports = (references, _options, context) => {
  if (!Array.isArray(references)) {
    return [
      {
        message: "The 'x-payload-references' extension must be an array.",
        path: [...context.path],
      },
    ];
  }

  const errors = [];

  references.forEach((item, idx) => {
    const itemPath = [...context.path, idx];

    if (!item || typeof item !== "object" || Array.isArray(item)) {
      errors.push({
        message: `Item at index ${idx} in 'x-payload-references' must be an object.`,
        path: itemPath,
      });
      return;
    }

    REQUIRED_FIELDS.forEach((field) => {
      const hasField = Object.prototype.hasOwnProperty.call(item, field);
      if (!hasField) {
        errors.push({
          message: `Item at index ${idx} in 'x-payload-references' is missing the required non-empty field '${field}'.`,
          path: itemPath,
        });
        return;
      }

      if (isInvalidValue(item[field])) {
        errors.push({
          message: `Item at index ${idx} in 'x-payload-references' is missing the required non-empty field '${field}'.`,
          path: [...itemPath, field],
        });
      }
    });
  });

  return errors;
};
