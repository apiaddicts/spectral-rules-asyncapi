/**
 * AAR018 - SecuritySchemas
 * Validates that security schemes are among those allowed by the organization
 * and that they are complete (have all required fields).
 *
 * @param {object} given - The security scheme object
 * @param {object} options - Configuration options
 * @param {string[]} options.allowedTypes - List of allowed security scheme types
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */
module.exports = (given, options, context) => {
  const errors = [];
  const allowedTypes = options?.allowedTypes || [];

  if (!given || typeof given !== "object") {
    return errors;
  }

  const type = given.type;

  // Check if type is defined
  if (!type) {
    errors.push({
      message: "Security scheme must define a 'type' field.",
      path: [...context.path, "type"],
    });
    return errors;
  }

  // Check if type is among allowed types
  if (allowedTypes.length > 0 && !allowedTypes.includes(type)) {
    errors.push({
      message: `Security scheme type '${type}' is not among the allowed types: ${allowedTypes.join(", ")}.`,
      path: [...context.path, "type"],
    });
  }

  // Validate completeness based on type
  switch (type) {
    case "http":
      if (!given.scheme) {
        errors.push({
          message:
            "Security scheme of type 'http' must define a 'scheme' field (e.g., 'bearer', 'basic').",
          path: [...context.path, "scheme"],
        });
      }
      break;

    case "apiKey":
    case "httpApiKey":
      if (!given.in) {
        errors.push({
          message: `Security scheme of type '${type}' must define an 'in' field (e.g., 'user', 'password', 'query', 'header', 'cookie').`,
          path: [...context.path, "in"],
        });
      }
      break;

    case "oauth2":
      if (!given.flows || typeof given.flows !== "object") {
        errors.push({
          message:
            "Security scheme of type 'oauth2' must define a 'flows' object.",
          path: [...context.path, "flows"],
        });
      }
      break;

    case "openIdConnect":
      if (!given.openIdConnectUrl) {
        errors.push({
          message:
            "Security scheme of type 'openIdConnect' must define an 'openIdConnectUrl' field.",
          path: [...context.path, "openIdConnectUrl"],
        });
      }
      break;

    default:
      break;
  }

  return errors;
};
