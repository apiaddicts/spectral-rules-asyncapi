module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "description": "Petstore API where channel operations lack a security scheme.",
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
      "description": "Subscribe operation without any security field.",
      "subscribe": {
        "operationId": "onPetCreated",
        "summary": "Receive pet created events.",
        "description": "Subscribe missing the security field entirely.",
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
      "description": "Publish operation without any security field.",
      "publish": {
        "operationId": "publishPetUpdated",
        "summary": "Publish pet updated events.",
        "description": "Publish missing the security field entirely.",
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
      "description": "Subscribe with an empty security array, which Spectral treats as falsy.",
      "subscribe": {
        "operationId": "onPetDeleted",
        "summary": "Receive pet deleted events.",
        "description": "Subscribe with security set to an empty array.",
        "security": [],
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
    "pet/archived": {
      "description": "Publish with an empty security array, which Spectral treats as falsy.",
      "publish": {
        "operationId": "publishPetArchived",
        "summary": "Publish pet archived events.",
        "description": "Publish with security set to an empty array.",
        "security": [],
        "tags": [{ "name": "pets", "description": "Pet-related operations." }],
        "message": {
          "title": "PetArchived",
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
      "description": "Both operations on the same channel missing security.",
      "subscribe": {
        "operationId": "onOrderPlaced",
        "summary": "Receive order placed events.",
        "description": "Subscribe without security on a dual-operation channel.",
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
        "description": "Publish without security on a dual-operation channel.",
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
