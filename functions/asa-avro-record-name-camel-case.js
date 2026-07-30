/**
 * @param {object} record - An object anywhere in the document with `type === 'record'`
 * @param {object} _options - Unused options
 * @param {import('@stoplight/spectral-core').RulesetFunctionContext} context
 * @returns {Array} Array of error objects
 */

const CAMEL_CASE_PATTERN = /^[A-Z][a-z0-9]+(?:[A-Z][a-z0-9]*)*$/;

module.exports = (record, _options, context) => {
  const name = record && record.name;
  if (typeof name !== "string" || CAMEL_CASE_PATTERN.test(name)) {
    return [];
  }

  return [
    {
      message: `Avro record name '${name}' must be in CamelCase with an uppercase first letter (e.g. SolicitudComunicacion, ResultadoComunicacionMail).`,
      path: [...context.path, "name"],
    },
  ];
};
