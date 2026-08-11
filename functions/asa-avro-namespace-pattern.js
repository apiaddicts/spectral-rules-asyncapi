/**
 * @param {object} schema  - The Avro schema node (already unwrapped by the deep-scan; a v3
 *                           Multi-Format Schema Object's inner `schema` is matched directly).
 * @param {object} options - Function options, e.g. { pattern: "<regex>" }
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */
const DEFAULT_PATTERN =
  "^org\\.madrid\\.(common\\.[a-z0-9_-]+|[a-z0-9_-]+\\.[a-z0-9_-]+\\.[a-z0-9_-]+)$";

const AVRO_NAMED_TYPES = new Set(["record", "enum", "fixed"]);

function isInsideAvroFields(path) {
  for (let i = 0; i < path.length - 1; i++) {
    if (path[i] === "fields" && typeof path[i + 1] === "number") {
      return true;
    }
  }
  return false;
}

function isUnderOneOf(path) {
  return path.includes("oneOf");
}

module.exports = (schema, options, context) => {
  if (!schema || typeof schema !== "object") {
    return [];
  }
  if (!AVRO_NAMED_TYPES.has(schema.type)) {
    return [];
  }

  const path = context.path;
  if (isInsideAvroFields(path)) {
    return [];
  }
  if (isUnderOneOf(path)) {
    return [];
  }

  const namespace = schema.namespace;
  if (namespace === undefined || namespace === null) {
    return [
      {
        message:
          "Avro namespace is required and must follow the corporate pattern (org.madrid.<cod_poaps>.<classification>.<domain> or org.madrid.common.<domain>).",
        path: [...path],
      },
    ];
  }

  const patternStr = (options && options.pattern) || DEFAULT_PATTERN;
  const pattern = new RegExp(patternStr);

  if (typeof namespace !== "string" || !pattern.test(namespace)) {
    return [
      {
        message: `Avro namespace '${namespace}' does not follow the corporate pattern (org.madrid.<cod_poaps>.<classification>.<domain> or org.madrid.common.<domain>).`,
        path: [...path],
      },
    ];
  }

  return [];
};
