/**
 * @param {object} server - A single server object (given: "$.servers[*]")
 * @param {object} options - Configuration options (unused)
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */

const ALLOWED_PROTOCOLS = ["kafka", "kafka-ssl"];

module.exports = (server, options, context) => {
  const errors = [];

  if (!server || typeof server !== "object") {
    return errors;
  }

  const raw = server.protocol;
  if (raw === null || raw === undefined) {
    return errors;
  }

  const isScalar = typeof raw !== "object";
  if (!isScalar) {
    errors.push({
      message: "The server protocol must be 'kafka' or 'kafka-ssl'. Found a non-scalar value.",
      path: [...context.path, "protocol"],
    });
    return errors;
  }

  const protocol = String(raw);
  if (!ALLOWED_PROTOCOLS.includes(protocol)) {
    errors.push({
      message: `The server protocol must be 'kafka' or 'kafka-ssl'. Found '${protocol}'.`,
      path: [...context.path, "protocol"],
    });
  }

  return errors;
};
