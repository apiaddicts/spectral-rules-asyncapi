module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Avro Schema Format - Non-string Scenarios"
  },
  "channels": {
    "numberFormat": {
      "subscribe": {
        "message": {
          "schemaFormat": 12345,
          "payload": { "type": "object", "properties": { "id": { "type": "string" } } }
        }
      }
    },
    "booleanFormat": {
      "subscribe": {
        "message": {
          "schemaFormat": true,
          "payload": { "type": "object", "properties": { "id": { "type": "string" } } }
        }
      }
    },
    "nullFormat": {
      "subscribe": {
        "message": {
          "schemaFormat": null,
          "payload": { "type": "object", "properties": { "id": { "type": "string" } } }
        }
      }
    },
    "objectFormat": {
      "subscribe": {
        "message": {
          "schemaFormat": { "oops": true },
          "payload": { "type": "object", "properties": { "id": { "type": "string" } } }
        }
      }
    },
    "arrayFormat": {
      "subscribe": {
        "message": {
          "schemaFormat": ["application/vnd.apache.avro"],
          "payload": { "type": "object", "properties": { "id": { "type": "string" } } }
        }
      }
    }
  }
};
