module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "description": "Petstore API where all channel operations define a security scheme.",
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
      "description": "Subscribe-only channel with security defined.",
      "subscribe": {
        "operationId": "onPetCreated",
        "summary": "Receive pet created events.",
        "description": "Handles incoming pet creation notifications.",
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
      "description": "Publish-only channel with security defined.",
      "publish": {
        "operationId": "publishPetUpdated",
        "summary": "Publish pet updated events.",
        "description": "Publishes pet update notifications.",
        "security": [{ "apiKeyScheme": [] }],
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
      "description": "Dual-operation channel where both operations define security.",
      "subscribe": {
        "operationId": "onOrderPlaced",
        "summary": "Receive order placed events.",
        "description": "Handles incoming order placement notifications.",
        "security": [{ "bearerAuth": [] }, { "apiKeyScheme": [] }],
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
        "description": "Publishes order placement notifications.",
        "security": [{ "oauth2Scheme": ["write:orders"] }],
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
      "description": "Subscribe channel using OAuth2 scoped security.",
      "subscribe": {
        "operationId": "onInventoryLow",
        "summary": "Receive low inventory alerts.",
        "description": "Handles incoming low inventory alerts.",
        "security": [{ "oauth2Scheme": ["read:inventory"] }],
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
    }
  },
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT",
        "description": "JWT Bearer token authentication."
      },
      "apiKeyScheme": {
        "type": "apiKey",
        "in": "user",
        "description": "API key authentication."
      },
      "oauth2Scheme": {
        "type": "oauth2",
        "flows": {
          "clientCredentials": {
            "tokenUrl": "https://auth.petstore.example.com/oauth/token",
            "scopes": {
              "read:inventory": "Read inventory.",
              "write:orders": "Write orders."
            }
          }
        },
        "description": "OAuth2 client credentials authentication."
      }
    }
  }
};
