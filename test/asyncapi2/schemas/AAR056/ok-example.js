module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Avro Schema Format - Pass Scenarios"
  },
  "channels": {
    "carga": {
      "subscribe": {
        "message": {
          "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
          "payload": {
            "type": "record",
            "name": "CargaValue",
            "namespace": "com.example.avro",
            "fields": [
              { "name": "id", "type": "string" }
            ]
          }
        }
      }
    },
    "cargaJson": {
      "subscribe": {
        "message": {
          "schemaFormat": "application/schema+json;version=draft-07",
          "payload": {
            "type": "object",
            "properties": { "id": { "type": "string" } }
          }
        }
      }
    }
  }
};
