module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "description": "Petstore API where operations are missing a summary.",
    "contact": {
      "name": "API Support",
      "url": "https://petstore.example.com/support",
      "email": "support@petstore.example.com"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0"
    }
  },
  "id": "urn:petstore:asyncapi",
  "servers": {
    "production": {
      "url": "amqps://petstore.example.com",
      "protocol": "amqps",
      "description": "Production broker."
    }
  },
  "channels": {
    "pet/created": {
      "description": "Subscribe without any summary field.",
      "subscribe": {
        "operationId": "onPetCreated",
        "description": "Subscribe missing the summary field entirely.",
        "security": [{ "bearerAuth": [] }],
        "tags": [{ "name": "pets", "description": "Pet-related operations." }],
        "message": {
          "title": "PetCreated",
          "payload": {
            "type": "object",
            "properties": {
              "petId": { "type": "string", "minLength": 1, "maxLength": 50 }
            }
          }
        }
      }
    },
    "pet/updated": {
      "description": "Publish without any summary field.",
      "publish": {
        "operationId": "publishPetUpdated",
        "description": "Publish missing the summary field entirely.",
        "security": [{ "bearerAuth": [] }],
        "tags": [{ "name": "pets", "description": "Pet-related operations." }],
        "message": {
          "title": "PetUpdated",
          "payload": {
            "type": "object",
            "properties": {
              "petId": { "type": "string", "minLength": 1, "maxLength": 50 }
            }
          }
        }
      }
    },
    "pet/deleted": {
      "description": "Subscribe with an empty string summary.",
      "subscribe": {
        "operationId": "onPetDeleted",
        "summary": "",
        "description": "Subscribe with summary set to an empty string.",
        "security": [{ "bearerAuth": [] }],
        "tags": [{ "name": "pets", "description": "Pet-related operations." }],
        "message": {
          "title": "PetDeleted",
          "payload": {
            "type": "object",
            "properties": {
              "petId": { "type": "string", "minLength": 1, "maxLength": 50 }
            }
          }
        }
      }
    },
    "order/placed": {
      "description": "Publish with a null summary.",
      "publish": {
        "operationId": "publishOrderPlaced",
        "summary": null,
        "description": "Publish with summary explicitly set to null.",
        "security": [{ "bearerAuth": [] }],
        "tags": [{ "name": "orders", "description": "Order-related operations." }],
        "message": {
          "title": "OrderPlaced",
          "payload": {
            "type": "object",
            "properties": {
              "orderId": { "type": "string", "minLength": 1, "maxLength": 50 }
            }
          }
        }
      }
    },
    "order/fulfilled": {
      "description": "Dual-operation channel where both operations lack a summary.",
      "subscribe": {
        "operationId": "onOrderFulfilled",
        "description": "Subscribe missing summary on a dual-operation channel.",
        "security": [{ "bearerAuth": [] }],
        "tags": [{ "name": "orders", "description": "Order-related operations." }],
        "message": {
          "title": "OrderFulfilled",
          "payload": {
            "type": "object",
            "properties": {
              "orderId": { "type": "string", "minLength": 1, "maxLength": 50 }
            }
          }
        }
      },
      "publish": {
        "operationId": "publishOrderFulfilled",
        "description": "Publish missing summary on a dual-operation channel.",
        "security": [{ "bearerAuth": [] }],
        "tags": [{ "name": "orders", "description": "Order-related operations." }],
        "message": {
          "title": "OrderFulfilledOut",
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
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT",
        "description": "JWT Bearer token authentication."
      }
    }
  }
};
