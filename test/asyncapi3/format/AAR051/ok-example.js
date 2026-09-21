module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "title": "Swagger Petstore",
    "version": "1.0.0",
    "description": "Petstore API (AsyncAPI 3.x) where every operation key follows camelCase."
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
      "description": "camelCase operation key.",
      "action": "receive",
      "channel": { "$ref": "#/channels/petEvents" }
    },
    "sendPetUpdated": {
      "description": "camelCase operation key.",
      "action": "send",
      "channel": { "$ref": "#/channels/petEvents" }
    },
    "processTopic2Topic3": {
      "description": "camelCase operation key containing digits.",
      "action": "send",
      "channel": { "$ref": "#/channels/orderEvents" }
    },
    "a": {
      "description": "Single lowercase letter operation key.",
      "action": "send",
      "channel": { "$ref": "#/channels/orderEvents" }
    },
    "processCustomerInvoiceWithDiscountApplied": {
      "description": "Long camelCase operation key.",
      "action": "send",
      "channel": { "$ref": "#/channels/orderEvents" }
    },
    "reuseSharedOperation": {
      "$ref": "#/components/operations/sharedOperation"
    }
  },
  "components": {
    "operations": {
      "sharedOperation": {
        "description": "Reusable operation with a camelCase key.",
        "action": "receive",
        "channel": { "$ref": "#/channels/orderEvents" }
      }
    }
  }
};
