module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "description": "Petstore API with invalid security scheme definitions.",
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
      "description": "Channel for pet creation events.",
      "subscribe": {
        "operationId": "onPetCreated",
        "summary": "Receive pet created events.",
        "description": "Handles incoming pet creation notifications.",
        "security": [{ "userPasswordScheme": [] }],
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
    }
  },
  "components": {
    "securitySchemes": {
      "noTypeScheme": {
        "description": "Scheme without a type field — fails because type is missing."
      },
      "disallowedTypeScheme": {
        "type": "customOAuth",
        "description": "Scheme with a type not in the allowed list."
      },
      "httpMissingScheme": {
        "type": "http",
        "description": "HTTP scheme without the required scheme field."
      },
      "apiKeyMissingIn": {
        "type": "apiKey",
        "description": "API key scheme without the required in field."
      },
      "httpApiKeyMissingIn": {
        "type": "httpApiKey",
        "name": "X-Api-Key",
        "description": "HTTP API key scheme without the required in field."
      },
      "oauth2MissingFlows": {
        "type": "oauth2",
        "description": "OAuth2 scheme without the required flows object."
      },
      "oauth2NullFlows": {
        "type": "oauth2",
        "flows": null,
        "description": "OAuth2 scheme with flows explicitly set to null."
      },
      "openIdConnectMissingUrl": {
        "type": "openIdConnect",
        "description": "OpenID Connect scheme without the required openIdConnectUrl field."
      }
    }
  }
};
