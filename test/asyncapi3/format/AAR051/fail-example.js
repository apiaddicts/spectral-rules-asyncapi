module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "title": "Swagger Petstore",
    "version": "1.0.0",
    "description": "Petstore API (AsyncAPI 3.x) where operation keys do not follow camelCase."
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
    "SendPetCreated": {
      "description": "PascalCase operation key.",
      "action": "send",
      "channel": { "$ref": "#/channels/petEvents" }
    },
    "send_pet_updated": {
      "description": "snake_case operation key.",
      "action": "send",
      "channel": { "$ref": "#/channels/petEvents" }
    },
    "send-pet-deleted": {
      "description": "kebab-case operation key.",
      "action": "send",
      "channel": { "$ref": "#/channels/petEvents" }
    },
    "2sendOrderPlaced": {
      "description": "Operation key starting with a digit.",
      "action": "send",
      "channel": { "$ref": "#/channels/orderEvents" }
    },
    "SEND_ORDER_CANCELLED": {
      "description": "SCREAMING_SNAKE_CASE operation key.",
      "action": "send",
      "channel": { "$ref": "#/channels/orderEvents" }
    },
    "send order shipped": {
      "description": "Operation key with spaces.",
      "action": "send",
      "channel": { "$ref": "#/channels/orderEvents" }
    },
    "": {
      "description": "Empty operation key: no usable identifier at all.",
      "action": "send",
      "channel": { "$ref": "#/channels/orderEvents" }
    },
    "receivePetEvents": {
      "description": "Valid camelCase key, must not be reported.",
      "action": "receive",
      "channel": { "$ref": "#/channels/petEvents" }
    },
    "goodKeyWithBadOperationId": {
      "description": "Stray operationId field: AsyncAPI 3.x only evaluates the key.",
      "action": "send",
      "channel": { "$ref": "#/channels/petEvents" },
      "operationId": "bad_operation_id"
    },
    "x-internal-operation": {
      "description": "Extension key, not an operation, must not be reported.",
      "action": "send",
      "channel": { "$ref": "#/channels/petEvents" }
    }
  },
  "components": {
    "operations": {
      "SharedOperation": {
        "description": "Reusable operation with a PascalCase key.",
        "action": "receive",
        "channel": { "$ref": "#/channels/orderEvents" }
      },
      "sharedOperation": {
        "description": "Reusable operation with a valid camelCase key.",
        "action": "receive",
        "channel": { "$ref": "#/channels/orderEvents" }
      }
    }
  }
};
