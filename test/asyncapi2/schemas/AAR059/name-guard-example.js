const avro = "application/vnd.apache.avro;version=1.9.0";

module.exports = {
  "asyncapi": "2.6.0",
  "info": { "version": "1.0.0", "title": "Avro Record Name CamelCase - Name Guard" },
  "components": {
    "schemas": {
      "MissingName": { "schemaFormat": avro, "schema": { "type": "record", "namespace": "org.example.orders", "fields": [{ "name": "id", "type": "string" }] } },
      "NullName": { "schemaFormat": avro, "schema": { "type": "record", "name": null, "fields": [{ "name": "id", "type": "string" }] } }
    }
  }
};
