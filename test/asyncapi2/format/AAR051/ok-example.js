module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "description": "Petstore API where all operations declare a camelCase operationId.",
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
      "description": "Subscribe with a camelCase operationId.",
      "subscribe": {
        "operationId": "solicitarBeca",
        "summary": "Receive pet created events.",
        "description": "Subscribe with a valid camelCase operationId.",
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
      "description": "Publish with a camelCase operationId.",
      "publish": {
        "operationId": "recuperarBeca",
        "summary": "Publish pet updated events.",
        "description": "Publish with a valid camelCase operationId.",
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
      "description": "Publish with a camelCase operationId containing digits.",
      "publish": {
        "operationId": "processTopic2Topic3",
        "summary": "Publish order placed events.",
        "description": "Publish with a valid camelCase operationId containing digits.",
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
    "invoice/issued": {
      "description": "Channel exercising the boundaries of the camelCase pattern.",
      "publish": {
        "operationId": "a",
        "summary": "Single lowercase letter operationId.",
        "message": { "payload": { "type": "object" } }
      },
      "subscribe": {
        "operationId": "procesarFacturaDeClienteConDescuentoAplicadoYRevisado",
        "summary": "Long camelCase operationId.",
        "message": { "payload": { "type": "object" } }
      }
    },
    "x-internal-routing": {
      "description": "Extension key, not a channel, must not be evaluated.",
      "publish": {
        "summary": "Operation without operationId inside an extension."
      }
    }
  },
  "components": {
    "channels": {
      "reservation/created": {
        "description": "Reusable channel defined under components.",
        "subscribe": {
          "operationId": "obtenerReserva",
          "summary": "Receive reservation created events.",
          "message": { "payload": { "type": "object" } }
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
