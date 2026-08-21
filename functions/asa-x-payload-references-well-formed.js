/**
 * @param {*} references - The value found at the x-payload-references key
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */
const REQUIRED_FIELDS = ["subject", "ref", "referenceName"];

const FIELD_PATTERNS = {
  subject: /^[:a-zA-Z0-9_.-]+$/,
  ref: /^(?:https?|svn|svn\+ssh|file):\/\/[^\s?@]+\.avsc(?:[?@]\S*)?$/,
  referenceName: /^[a-z][a-z0-9_]{0,62}(?:\.[a-z][a-z0-9_]{0,62}){0,20}\.[A-Z]\w{0,62}$/,
};

const FIELD_FORMAT_MESSAGES = {
  subject: "must be a valid schema registry subject name",
  ref: "must be an SVN URL that points to a .avsc file",
  referenceName:
    "must be a fully qualified Avro type name (lowercase namespace and capitalized type)",
};

function isEmptyValue(value) {
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

      const value = item[field];
      if (isEmptyValue(value)) {
        errors.push({
          message: `Item at index ${idx} in 'x-payload-references' is missing the required non-empty field '${field}'.`,
          path: [...itemPath, field],
        });
        return;
      }

      if (!FIELD_PATTERNS[field].test(String(value))) {
        errors.push({
          message: `Item at index ${idx} in 'x-payload-references' has an invalid '${field}' value; it ${FIELD_FORMAT_MESSAGES[field]}.`,
          path: [...itemPath, field],
        });
      }
    });
  });

  return errors;
};
