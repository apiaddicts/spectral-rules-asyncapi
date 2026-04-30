module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "description": "Petstore API where all operations provide a summary.",
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
      "description": "Subscribe-only channel with a summary.",
      "subscribe": {
        "operationId": "onPetCreated",
        "summary": "Receive pet created events.",
        "description": "Subscribe to pet creation events.",
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
      "description": "Publish-only channel with a summary.",
      "publish": {
        "operationId": "publishPetUpdated",
        "summary": "Publish pet updated events.",
        "description": "Publish pet update notifications.",
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
    "order/placed": {
      "description": "Dual-operation channel where both operations have a summary.",
      "subscribe": {
        "operationId": "onOrderPlaced",
        "summary": "Receive order placed events.",
        "description": "Subscribe to order placement events.",
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
      },
      "publish": {
        "operationId": "publishOrderPlaced",
        "summary": "Publish order placed events.",
        "description": "Publish order placement notifications.",
        "security": [{ "bearerAuth": [] }],
        "tags": [{ "name": "orders", "description": "Order-related operations." }],
        "message": {
          "title": "OrderPlacedOut",
          "payload": {
            "type": "object",
            "properties": {
              "orderId": { "type": "string", "minLength": 1, "maxLength": 50 }
            }
          }
        }
      }
    },
    "inventory/low": {
      "description": "Subscribe channel with a descriptive summary.",
      "subscribe": {
        "operationId": "onInventoryLow",
        "summary": "Receive low inventory alerts.",
        "description": "Subscribe to low inventory alerts.",
        "security": [{ "bearerAuth": [] }],
        "tags": [{ "name": "inventory", "description": "Inventory-related operations." }],
        "message": {
          "title": "InventoryLow",
          "payload": {
            "type": "object",
            "properties": {
              "itemId": { "type": "string", "minLength": 1, "maxLength": 50 }
            }
          }
        }
      }
    },
    "store/notification": {
      "description": "Dual-operation channel with concise summaries for both operations.",
      "subscribe": {
        "operationId": "onStoreNotification",
        "summary": "Receive store notifications.",
        "description": "Subscribe to general store notifications.",
        "security": [{ "bearerAuth": [] }],
        "tags": [{ "name": "store", "description": "Store-related operations." }],
        "message": {
          "title": "StoreNotification",
          "payload": {
            "type": "object",
            "properties": {
              "message": { "type": "string", "minLength": 1, "maxLength": 200 }
            }
          }
        }
      },
      "publish": {
        "operationId": "publishStoreNotification",
        "summary": "Publish store notifications.",
        "description": "Publish general store notifications.",
        "security": [{ "bearerAuth": [] }],
        "tags": [{ "name": "store", "description": "Store-related operations." }],
        "message": {
          "title": "StoreNotificationOut",
          "payload": {
            "type": "object",
            "properties": {
              "message": { "type": "string", "minLength": 1, "maxLength": 200 }
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
