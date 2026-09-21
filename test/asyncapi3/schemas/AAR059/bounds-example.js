const avro = "application/vnd.apache.avro;version=1.9.0";

module.exports = {
  "asyncapi": "3.0.0",
  "info": { "version": "1.0.0", "title": "Avro Record Name CamelCase - Regex Bounds" },
  "components": {
    "schemas": {
      "ValidExactWord": { "schemaFormat": avro, "schema": { "type": "record", "name": "A" + "a".repeat(62), "fields": [{ "name": "id", "type": "string" }] } },
      "ValidMaxGroups": { "schemaFormat": avro, "schema": { "type": "record", "name": "Aa" + "Bc".repeat(20), "fields": [{ "name": "id", "type": "string" }] } },
      "InvalidOverWord": { "schemaFormat": avro, "schema": { "type": "record", "name": "A" + "a".repeat(63), "fields": [{ "name": "id", "type": "string" }] } },
      "InvalidOverGroups": { "schemaFormat": avro, "schema": { "type": "record", "name": "Aa" + "Bc".repeat(21), "fields": [{ "name": "id", "type": "string" }] } },
      "InvalidLongWord": { "schemaFormat": avro, "schema": { "type": "record", "name": "A" + "a".repeat(200), "fields": [{ "name": "id", "type": "string" }] } },
      "InvalidManyGroups": { "schemaFormat": avro, "schema": { "type": "record", "name": "Aa" + "Bc".repeat(100), "fields": [{ "name": "id", "type": "string" }] } }
    }
  }
};
