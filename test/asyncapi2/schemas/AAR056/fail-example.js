module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Avro Schema Format - Fail Scenarios"
  },
  "channels": {
    "carga": {
      "subscribe": {
        "message": {
          "schemaFormat": "application/vnd.apache.avro;version=1.8.0",
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
    }
  },
  "components": {
    "schemas": {
      "CargaComponent": {
        "schemaFormat": "application/vnd.apache.avro",
        "type": "record",
        "name": "CargaComponent",
        "namespace": "com.example.avro",
        "fields": [
          { "name": "id", "type": "string" }
        ]
      }
    }
  }
};
