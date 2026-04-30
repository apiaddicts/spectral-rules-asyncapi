module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "description": "Petstore API where all messages have a title.",
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
      "description": "Channel using an inline subscribe message with a title.",
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
      "description": "Channel using an inline publish message with a title.",
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
      "description": "Dual-operation channel where both inline messages have titles.",
      "subscribe": {
        "operationId": "onOrderPlaced",
        "summary": "Receive order placed events.",
        "description": "Subscribe to order placement events.",
        "security": [{ "bearerAuth": [] }],
        "tags": [{ "name": "orders", "description": "Order-related operations." }],
        "message": {
          "title": "OrderPlacedIn",
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
    "user/signedup": {
      "description": "Channel referencing a component message that also has a title.",
      "subscribe": {
        "operationId": "onUserSignedUp",
        "summary": "Receive user signed up events.",
        "description": "Subscribe to user registration events.",
        "security": [{ "bearerAuth": [] }],
        "tags": [{ "name": "users", "description": "User-related operations." }],
        "message": {
          "$ref": "#/components/messages/UserSignedUp"
        }
      }
    }
  },
  "components": {
    "messages": {
      "UserSignedUp": {
        "title": "User Signed Up",
        "payload": {
          "type": "object",
          "properties": {
            "userId": { "type": "string", "minLength": 1, "maxLength": 50 }
          }
        }
      },
      "UserLoggedIn": {
        "title": "User Logged In",
        "payload": {
          "type": "object",
          "properties": {
            "userId": { "type": "string", "minLength": 1, "maxLength": 50 }
          }
        }
      },
      "UserLoggedOut": {
        "title": "User Logged Out",
        "payload": {
          "type": "object",
          "properties": {
            "userId": { "type": "string", "minLength": 1, "maxLength": 50 }
          }
        }
      }
    },
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
