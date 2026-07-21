/**
 * @param {*} schemaFormat - The value found at the schemaFormat key
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */
const AVRO_SCHEMA_FORMAT_PREFIX = "application/vnd.apache.avro";
const EXPECTED_SCHEMA_FORMAT = "application/vnd.apache.avro;version=1.9.0";

module.exports = (schemaFormat, _options, context) => {
  if (typeof schemaFormat !== "string" || !schemaFormat.includes(AVRO_SCHEMA_FORMAT_PREFIX)) {
    return [];
  }

  if (schemaFormat === EXPECTED_SCHEMA_FORMAT) {
    return [];
  }

  return [
    {
      message: `The 'schemaFormat' value '${schemaFormat}' must be exactly '${EXPECTED_SCHEMA_FORMAT}' when the payload uses Avro.`,
      path: [...context.path],
    },
  ];
};
