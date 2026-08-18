module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Avro Schema Format - Fail Scenarios"
  },
  "channels": {
    "carga": {
      "address": "carga",
      "messages": {
        "CargaMessage": {
          "payload": {
            "schemaFormat": "application/vnd.apache.avro;version=1.8.0",
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
    }
  },
  "components": {
    "schemas": {
      "CargaComponent": {
        "schemaFormat": "application/vnd.apache.avro",
        "schema": {
          "type": "record",
          "name": "CargaComponent",
          "namespace": "com.example.avro",
          "fields": [
            { "name": "id", "type": "string" }
          ]
        }
      }
    }
  }
};
