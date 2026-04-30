module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "description": "Petstore API where all tags are documented with descriptions.",
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
  "tags": [
    { "name": "global", "description": "Global API tag." },
    { "name": "events", "description": "Event-driven operations." }
  ],
  "channels": {
    "pet/created": {
      "description": "Subscribe-only channel with all tags documented.",
      "subscribe": {
        "operationId": "onPetCreated",
        "summary": "Receive pet created events.",
        "description": "Subscribe to pet creation events.",
        "security": [{ "bearerAuth": [] }],
        "tags": [
          { "name": "pets", "description": "Pet-related operations." },
          { "name": "events", "description": "Event-driven operations." }
        ],
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
      "description": "Publish-only channel with all tags documented.",
      "publish": {
        "operationId": "publishPetUpdated",
        "summary": "Publish pet updated events.",
        "description": "Publish pet update notifications.",
        "security": [{ "bearerAuth": [] }],
        "tags": [
          { "name": "pets", "description": "Pet-related operations." }
        ],
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
      "description": "Dual-operation channel where all tags on both operations have descriptions.",
      "subscribe": {
        "operationId": "onOrderPlaced",
        "summary": "Receive order placed events.",
        "description": "Subscribe to order placement events.",
        "security": [{ "bearerAuth": [] }],
        "tags": [
          { "name": "orders", "description": "Order-related operations." },
          { "name": "commerce", "description": "Commerce-related operations." }
        ],
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
        "tags": [
          { "name": "orders", "description": "Order-related operations." }
        ],
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
      "description": "Subscribe channel with a single well-documented tag.",
      "subscribe": {
        "operationId": "onInventoryLow",
        "summary": "Receive low inventory alerts.",
        "description": "Subscribe to low inventory alerts.",
        "security": [{ "bearerAuth": [] }],
        "tags": [
          { "name": "inventory", "description": "Inventory-related operations." }
        ],
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
