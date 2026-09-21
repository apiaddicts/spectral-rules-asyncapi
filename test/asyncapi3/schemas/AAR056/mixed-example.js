module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Avro Schema Format - Mixed Scenarios"
  },
  "channels": {
    "validCarga": {
      "address": "validCarga",
      "messages": {
        "ValidMessage": {
          "payload": {
            "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
            "schema": {
              "type": "record",
              "name": "ValidValue",
              "namespace": "com.example.avro",
              "fields": [{ "name": "id", "type": "string" }]
            }
          }
        }
      }
    },
    "wrongCarga": {
      "address": "wrongCarga",
      "messages": {
        "WrongMessage": {
          "payload": {
            "schemaFormat": "application/vnd.apache.avro;version=1.8.0",
            "schema": {
              "type": "record",
              "name": "WrongValue",
              "namespace": "com.example.avro",
              "fields": [{ "name": "id", "type": "string" }]
            }
          }
        }
      }
    }
  }
};
