module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Avro Schema Format - Mixed Scenarios"
  },
  "channels": {
    "validCarga": {
      "subscribe": {
        "message": {
          "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
          "payload": {
            "type": "record",
            "name": "ValidValue",
            "namespace": "com.example.avro",
            "fields": [{ "name": "id", "type": "string" }]
          }
        }
      }
    },
    "wrongCarga": {
      "subscribe": {
        "message": {
          "schemaFormat": "application/vnd.apache.avro;version=1.8.0",
          "payload": {
            "type": "record",
            "name": "WrongValue",
            "namespace": "com.example.avro",
            "fields": [{ "name": "id", "type": "string" }]
          }
        }
      }
    }
  }
};
