const avro = "application/vnd.apache.avro;version=1.9.0";

module.exports = {
  "asyncapi": "3.0.0",
  "info": { "version": "1.0.0", "title": "Avro Record Name CamelCase - Format Variants" },
  "components": {
    "schemas": {
      "LowerCamelCase": { "schemaFormat": avro, "schema": { "type": "record", "name": "solicitudComunicacion", "fields": [{ "name": "id", "type": "string" }] } },
      "LeadingDigit": { "schemaFormat": avro, "schema": { "type": "record", "name": "123Solicitud", "fields": [{ "name": "id", "type": "string" }] } },
      "EmptyName": { "schemaFormat": avro, "schema": { "type": "record", "name": "", "fields": [{ "name": "id", "type": "string" }] } },
      "SingleLetter": { "schemaFormat": avro, "schema": { "type": "record", "name": "A", "fields": [{ "name": "id", "type": "string" }] } },
      "ConsecutiveUppercase": { "schemaFormat": avro, "schema": { "type": "record", "name": "IOTData", "fields": [{ "name": "id", "type": "string" }] } }
    }
  }
};
