module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Avro Schema Format - Non-string Scenarios"
  },
  "channels": {
    "numberFormat": {
      "address": "numberFormat",
      "messages": {
        "NumberMessage": {
          "payload": {
            "schemaFormat": 12345,
            "schema": { "type": "object", "properties": { "id": { "type": "string" } } }
          }
        }
      }
    },
    "booleanFormat": {
      "address": "booleanFormat",
      "messages": {
        "BooleanMessage": {
          "payload": {
            "schemaFormat": true,
            "schema": { "type": "object", "properties": { "id": { "type": "string" } } }
          }
        }
      }
    },
    "nullFormat": {
      "address": "nullFormat",
      "messages": {
        "NullMessage": {
          "payload": {
            "schemaFormat": null,
            "schema": { "type": "object", "properties": { "id": { "type": "string" } } }
          }
        }
      }
    },
    "objectFormat": {
      "address": "objectFormat",
      "messages": {
        "ObjectMessage": {
          "payload": {
            "schemaFormat": { "oops": true },
            "schema": { "type": "object", "properties": { "id": { "type": "string" } } }
          }
        }
      }
    },
    "arrayFormat": {
      "address": "arrayFormat",
      "messages": {
        "ArrayMessage": {
          "payload": {
            "schemaFormat": ["application/vnd.apache.avro"],
            "schema": { "type": "object", "properties": { "id": { "type": "string" } } }
          }
        }
      }
    }
  }
};
