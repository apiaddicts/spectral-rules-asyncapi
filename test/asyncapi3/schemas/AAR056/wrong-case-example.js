module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Avro Schema Format - Wrong Case Scenarios"
  },
  "channels": {
    "upperCase": {
      "address": "upperCase",
      "messages": {
        "UpperMessage": {
          "payload": {
            "schemaFormat": "APPLICATION/VND.APACHE.AVRO;VERSION=1.9.0",
            "schema": {
              "type": "record",
              "name": "UpperValue",
              "namespace": "com.example.avro",
              "fields": [{ "name": "id", "type": "string" }]
            }
          }
        }
      }
    },
    "mixedCase": {
      "address": "mixedCase",
      "messages": {
        "MixedMessage": {
          "payload": {
            "schemaFormat": "Application/Vnd.Apache.Avro;version=1.9.0",
            "schema": {
              "type": "record",
              "name": "MixedValue",
              "namespace": "com.example.avro",
              "fields": [{ "name": "id", "type": "string" }]
            }
          }
        }
      }
    }
  }
};
