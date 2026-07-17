/**
 * @param {object} message - The message object (AsyncAPI 2.x or 3.x)
 * @param {object} options - Function options, e.g. { pattern: "<regex>" }
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */
const DEFAULT_PATTERN =
  "^org\\.madrid\\.(common\\.[a-z0-9_-]+|[a-z0-9_-]+\\.[a-z0-9_-]+\\.[a-z0-9_-]+)$";

module.exports = (message, options, context) => {
  if (!message || typeof message !== "object") {
    return [];
  }

  const payload = message.payload;
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const usesSchemaWrapper = payload.schema && typeof payload.schema === "object";
  const schema = usesSchemaWrapper ? payload.schema : payload;

  if (schema.type !== "record") {
    return [];
  }

  const namespace = schema.namespace;
  if (namespace === undefined || namespace === null) {
    return [];
  }

  const patternStr = (options && options.pattern) || DEFAULT_PATTERN;
  const pattern = new RegExp(patternStr);

  if (typeof namespace !== "string" || !pattern.test(namespace)) {
    const path = usesSchemaWrapper
      ? [...context.path, "payload", "schema"]
      : [...context.path, "payload"];
    return [
      {
        message: `Avro namespace '${namespace}' does not follow the corporate pattern (org.madrid.<cod_poaps>.<classification>.<domain> or org.madrid.common.<domain>).`,
        path,
      },
    ];
  }

  return [];
};
