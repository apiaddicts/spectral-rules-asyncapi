/**
 * AAR051 - OperationIdCamelCase
 * Validates that an operation's operationId is present and follows camelCase naming convention.
 *
 * @param {object} operation - The operation object (publish/subscribe or AsyncAPI 3.x operation)
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */
const CAMEL_CASE_PATTERN = /^[a-z][a-zA-Z0-9]*$/;

module.exports = (operation, _options, context) => {
  if (!operation || typeof operation !== "object") {
    return [];
  }

  const operationId = operation.operationId;

  if (operationId === undefined || operationId === null || operationId === "") {
    return [
      {
        message: "Operation must declare a non-empty 'operationId'.",
        path: [...context.path, "operationId"],
      },
    ];
  }

  if (typeof operationId !== "string" || !CAMEL_CASE_PATTERN.test(operationId)) {
    return [
      {
        message: `'operationId' must follow camelCase naming convention (e.g. 'solicitarBeca'). Found: '${operationId}'.`,
        path: [...context.path, "operationId"],
      },
    ];
  }

  return [];
};
