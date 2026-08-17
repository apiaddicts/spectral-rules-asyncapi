module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "title": "Swagger Petstore",
    "version": "1.0.0",
    "description": "Petstore API (AsyncAPI 3.x) where all operations declare a camelCase operationId."
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
      "description": "Receive with a camelCase operationId.",
      "action": "receive",
      "channel": { "$ref": "#/channels/petEvents" },
      "operationId": "solicitarBeca"
    },
    "sendPetUpdated": {
      "description": "Send with a camelCase operationId.",
      "action": "send",
      "channel": { "$ref": "#/channels/petEvents" },
      "operationId": "recuperarBeca"
    },
    "sendOrderPlaced": {
      "description": "Send with a camelCase operationId containing digits.",
      "action": "send",
      "channel": { "$ref": "#/channels/orderEvents" },
      "operationId": "processTopic2Topic3"
    }
  }
};
