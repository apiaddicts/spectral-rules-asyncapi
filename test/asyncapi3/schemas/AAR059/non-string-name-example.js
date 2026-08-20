const avro = "application/vnd.apache.avro;version=1.9.0";

module.exports = {
  "asyncapi": "3.0.0",
  "info": { "version": "1.0.0", "title": "Avro Record Name CamelCase - Non-String Name" },
  "components": {
    "schemas": {
      "NumberName": { "schemaFormat": avro, "schema": { "type": "record", "name": 123, "fields": [{ "name": "id", "type": "string" }] } },
      "BooleanName": { "schemaFormat": avro, "schema": { "type": "record", "name": true, "fields": [{ "name": "id", "type": "string" }] } },
      "ObjectName": { "schemaFormat": avro, "schema": { "type": "record", "name": {}, "fields": [{ "name": "id", "type": "string" }] } },
      "ArrayName": { "schemaFormat": avro, "schema": { "type": "record", "name": [], "fields": [{ "name": "id", "type": "string" }] } }
    }
  }
};
