/**
 * AAR037 - BindingVersion
 * Validates that all bindings specify a bindingVersion.
 *
 * @param {object} given - The binding object
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */
module.exports = (given, _options, context) => {
  const errors = [];

  if (!given || typeof given !== "object") {
    return errors;
  }

  if (!given.bindingVersion) {
    const bindingName = context.path[context.path.length - 1] || "unknown";
    errors.push({
      message: `Binding '${bindingName}' must specify a 'bindingVersion' field.`,
      path: [...context.path, "bindingVersion"],
    });
  }

  return errors;
};
