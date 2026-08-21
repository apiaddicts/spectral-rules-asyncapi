module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Avro Schema Format - Pass Scenarios"
  },
  "channels": {
    "carga": {
      "address": "carga",
      "messages": {
        "CargaMessage": {
          "payload": {
            "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
            "schema": {
              "type": "record",
              "name": "CargaValue",
              "namespace": "com.example.avro",
              "fields": [
                { "name": "id", "type": "string" }
              ]
            }
          }
        }
      }
    },
    "cargaJson": {
      "address": "cargaJson",
      "messages": {
        "CargaJsonMessage": {
          "payload": {
            "schemaFormat": "application/schema+json;version=draft-07",
            "schema": {
              "type": "object",
              "properties": { "id": { "type": "string" } }
            }
          }
        }
      }
    }
  }
};
