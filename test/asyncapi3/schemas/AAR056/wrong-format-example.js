module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Avro Schema Format - Wrong Format Scenarios"
  },
  "channels": {
    "whitespace": {
      "address": "whitespace",
      "messages": {
        "WhitespaceMessage": {
          "payload": {
            "schemaFormat": "application/vnd.apache.avro; version=1.9.0",
            "schema": {
              "type": "record",
              "name": "WhitespaceValue",
              "namespace": "com.example.avro",
              "fields": [{ "name": "id", "type": "string" }]
            }
          }
        }
      }
    },
    "charset": {
      "address": "charset",
      "messages": {
        "CharsetMessage": {
          "payload": {
            "schemaFormat": "application/vnd.apache.avro;version=1.9.0;charset=utf-8",
            "schema": {
              "type": "record",
              "name": "CharsetValue",
              "namespace": "com.example.avro",
              "fields": [{ "name": "id", "type": "string" }]
            }
          }
        }
      }
    }
  }
};
