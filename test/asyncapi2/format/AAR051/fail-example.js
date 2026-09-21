module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "description": "Petstore API where operationId is missing or not in camelCase.",
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
      "description": "Subscribe without operationId field.",
      "subscribe": {
        "summary": "Receive pet created events.",
        "description": "Subscribe missing operationId entirely.",
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
      "description": "Publish with a snake_case operationId.",
      "publish": {
        "operationId": "on_pet_updated",
        "summary": "Publish pet updated events.",
        "description": "Publish with operationId in snake_case, not camelCase.",
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
      "description": "Subscribe with a PascalCase operationId.",
      "subscribe": {
        "operationId": "OnPetDeleted",
        "summary": "Receive pet deleted events.",
        "description": "Subscribe with operationId in PascalCase, not camelCase.",
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
      "description": "Publish with an empty string operationId.",
      "publish": {
        "operationId": "",
        "summary": "Publish order placed events.",
        "description": "Publish with operationId set to an empty string.",
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
    "order/cancelled": {
      "description": "Publish with a non-string (numeric) operationId.",
      "publish": {
        "operationId": 12345,
        "summary": "Publish order cancelled events.",
        "description": "Publish with operationId set to a number instead of a string.",
        "security": [{ "bearerAuth": [] }],
        "tags": [{ "name": "orders", "description": "Order-related operations." }],
        "message": {
          "title": "OrderCancelled",
          "payload": {
            "type": "object",
            "properties": {
              "orderId": { "type": "string", "minLength": 1, "maxLength": 50 }
            }
          }
        }
      }
    },
    "order/refunded": {
      "description": "Publish with an explicitly null operationId.",
      "publish": {
        "operationId": null,
        "summary": "Publish order refunded events.",
        "description": "Publish with operationId explicitly set to null.",
        "message": {
          "title": "OrderRefunded",
          "payload": { "type": "object" }
        }
      }
    },
    "shipment/created": {
      "description": "Channel exercising a leading digit and kebab-case.",
      "publish": {
        "operationId": "2procesarEnvio",
        "summary": "operationId starting with a digit.",
        "message": { "payload": { "type": "object" } }
      },
      "subscribe": {
        "operationId": "procesar-envio",
        "summary": "operationId in kebab-case.",
        "message": { "payload": { "type": "object" } }
      }
    },
    "shipment/returned": {
      "description": "Channel exercising upper case and inner spaces.",
      "publish": {
        "operationId": "PROCESAR_DEVOLUCION",
        "summary": "operationId in SCREAMING_SNAKE_CASE.",
        "message": { "payload": { "type": "object" } }
      },
      "subscribe": {
        "operationId": "procesar devolucion",
        "summary": "operationId with inner spaces.",
        "message": { "payload": { "type": "object" } }
      }
    },
    "invoice/issued": {
      "description": "Channel exercising a trailing space and non ASCII characters.",
      "publish": {
        "operationId": "procesarFactura ",
        "summary": "operationId with a trailing space.",
        "message": { "payload": { "type": "object" } }
      },
      "subscribe": {
        "operationId": "procesarFacturaÑ",
        "summary": "operationId with accented characters.",
        "message": { "payload": { "type": "object" } }
      }
    },
    "audit/logged": {
      "description": "Channel exercising non-scalar and boolean operationId values.",
      "publish": {
        "operationId": true,
        "summary": "Boolean operationId.",
        "message": { "payload": { "type": "object" } }
      },
      "subscribe": {
        "operationId": { "name": "auditar" },
        "summary": "Object operationId.",
        "message": { "payload": { "type": "object" } }
      }
    },
    "alert/raised": {
      "description": "Channel exercising an array operationId.",
      "publish": {
        "operationId": ["enviarAlerta"],
        "summary": "Array operationId.",
        "message": { "payload": { "type": "object" } }
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
