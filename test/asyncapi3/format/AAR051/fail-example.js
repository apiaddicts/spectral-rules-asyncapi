module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "title": "Swagger Petstore",
    "version": "1.0.0",
    "description": "Petstore API (AsyncAPI 3.x) where operationId is missing or not in camelCase."
  },
  "channels": {
    "petEvents": {
      "address": "pet/events",
      "messages": {
        "PetEvent": {
          "payload": {
            "type": "object",
            "properties": {
              "petId": { "type": "string", "minLength": 1, "maxLength": 50 }
            }
          }
        }
      }
    },
    "orderEvents": {
      "address": "order/events",
      "messages": {
        "OrderEvent": {
          "payload": {
            "type": "object",
            "properties": {
              "orderId": { "type": "string", "minLength": 1, "maxLength": 50 }
            }
          }
        }
      }
    }
  },
  "operations": {
    "receivePetCreated": {
      "description": "Receive without operationId field.",
      "action": "receive",
      "channel": { "$ref": "#/channels/petEvents" }
    },
    "sendPetUpdated": {
      "description": "Send with a snake_case operationId.",
      "action": "send",
      "channel": { "$ref": "#/channels/petEvents" },
      "operationId": "on_pet_updated"
    },
    "receivePetDeleted": {
      "description": "Receive with a PascalCase operationId.",
      "action": "receive",
      "channel": { "$ref": "#/channels/petEvents" },
      "operationId": "OnPetDeleted"
    },
    "sendOrderPlaced": {
      "description": "Send with an empty string operationId.",
      "action": "send",
      "channel": { "$ref": "#/channels/orderEvents" },
      "operationId": ""
    },
    "sendOrderCancelled": {
      "description": "Send with a non-string (numeric) operationId.",
      "action": "send",
      "channel": { "$ref": "#/channels/orderEvents" },
      "operationId": 12345
    }
  }
};
