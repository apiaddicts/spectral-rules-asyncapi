module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "description": "Petstore API where tags are missing descriptions.",
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
    { "name": "global-undocumented" },
    { "name": "global-empty-description", "description": "" },
    { "name": "global-null-description", "description": null }
  ],
  "channels": {
    "pet/created": {
      "description": "Channel for pet creation events.",
      "subscribe": {
        "operationId": "onPetCreated",
        "summary": "Receive pet created events.",
        "description": "Subscribe to pet creation events.",
        "security": [{ "bearerAuth": [] }],
        "tags": [
          { "name": "pets-no-desc" },
          { "name": "pets-empty-desc", "description": "" }
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
      "description": "Channel for pet update events.",
      "publish": {
        "operationId": "publishPetUpdated",
        "summary": "Publish pet updated events.",
        "description": "Publish pet update notifications.",
        "security": [{ "bearerAuth": [] }],
        "tags": [
          { "name": "pets-null-desc", "description": null },
          { "name": "pets-no-desc-two" }
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
      "description": "Channel for order events with undocumented tags on both operations.",
      "subscribe": {
        "operationId": "onOrderPlaced",
        "summary": "Receive order placed events.",
        "description": "Subscribe to order placement events.",
        "security": [{ "bearerAuth": [] }],
        "tags": [
          { "name": "orders-no-desc" }
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
          { "name": "orders-empty-desc", "description": "" }
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
