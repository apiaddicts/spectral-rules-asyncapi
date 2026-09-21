module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Avro Schema Format - Wrong Format Scenarios"
  },
  "channels": {
    "whitespace": {
      "subscribe": {
        "message": {
          "schemaFormat": "application/vnd.apache.avro; version=1.9.0",
          "payload": {
            "type": "record",
            "name": "WhitespaceValue",
            "namespace": "com.example.avro",
            "fields": [{ "name": "id", "type": "string" }]
          }
        }
      }
    },
    "charset": {
      "subscribe": {
        "message": {
          "schemaFormat": "application/vnd.apache.avro;version=1.9.0;charset=utf-8",
          "payload": {
            "type": "record",
            "name": "CharsetValue",
            "namespace": "com.example.avro",
            "fields": [{ "name": "id", "type": "string" }]
          }
        }
      }
    }
  }
};
