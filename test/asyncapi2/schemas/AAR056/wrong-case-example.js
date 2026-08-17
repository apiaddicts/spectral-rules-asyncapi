module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Avro Schema Format - Wrong Case Scenarios"
  },
  "channels": {
    "upperCase": {
      "subscribe": {
        "message": {
          "schemaFormat": "APPLICATION/VND.APACHE.AVRO;VERSION=1.9.0",
          "payload": {
            "type": "record",
            "name": "UpperValue",
            "namespace": "com.example.avro",
            "fields": [{ "name": "id", "type": "string" }]
          }
        }
      }
    },
    "mixedCase": {
      "subscribe": {
        "message": {
          "schemaFormat": "Application/Vnd.Apache.Avro;version=1.9.0",
          "payload": {
            "type": "record",
            "name": "MixedValue",
            "namespace": "com.example.avro",
            "fields": [{ "name": "id", "type": "string" }]
          }
        }
      }
    }
  }
};
