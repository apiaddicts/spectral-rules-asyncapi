module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "description": "Petstore API with all allowed and complete security scheme types.",
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
    }
  },
  "components": {
    "securitySchemes": {
      "userPasswordScheme": {
        "type": "userPassword",
        "description": "Username and password authentication."
      },
      "apiKeyUserScheme": {
        "type": "apiKey",
        "in": "user",
        "description": "API key placed in the user field."
      },
      "apiKeyPasswordScheme": {
        "type": "apiKey",
        "in": "password",
        "description": "API key placed in the password field."
      },
      "x509Scheme": {
        "type": "X509",
        "description": "X.509 certificate-based authentication."
      },
      "symmetricEncryptionScheme": {
        "type": "symmetricEncryption",
        "description": "Symmetric encryption for message security."
      },
      "asymmetricEncryptionScheme": {
        "type": "asymmetricEncryption",
        "description": "Asymmetric encryption for message security."
      },
      "httpApiKeyHeaderScheme": {
        "type": "httpApiKey",
        "name": "X-Api-Key",
        "in": "header",
        "description": "HTTP API key transmitted via header."
      },
      "httpApiKeyQueryScheme": {
        "type": "httpApiKey",
        "name": "api_key",
        "in": "query",
        "description": "HTTP API key transmitted via query parameter."
      },
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT",
        "description": "JWT Bearer token authentication."
      },
      "basicAuth": {
        "type": "http",
        "scheme": "basic",
        "description": "HTTP Basic authentication."
      },
      "oauth2Scheme": {
        "type": "oauth2",
        "flows": {
          "clientCredentials": {
            "tokenUrl": "https://auth.petstore.example.com/oauth/token",
            "scopes": {
              "read:pets": "Read access to pets.",
              "write:pets": "Write access to pets."
            }
          },
          "authorizationCode": {
            "authorizationUrl": "https://auth.petstore.example.com/oauth/authorize",
            "tokenUrl": "https://auth.petstore.example.com/oauth/token",
            "scopes": {
              "read:pets": "Read access to pets."
            }
          }
        },
        "description": "OAuth2 authentication supporting multiple flows."
      },
      "openIdConnectScheme": {
        "type": "openIdConnect",
        "openIdConnectUrl": "https://auth.petstore.example.com/.well-known/openid-configuration",
        "description": "OpenID Connect authentication."
      },
      "scramSha256Scheme": {
        "type": "scramSha256",
        "description": "SCRAM SHA-256 authentication for Kafka and MQTT."
      },
      "scramSha512Scheme": {
        "type": "scramSha512",
        "description": "SCRAM SHA-512 authentication for Kafka and MQTT."
      },
      "gssapiScheme": {
        "type": "gssapi",
        "description": "GSSAPI/Kerberos authentication."
      },
      "plainScheme": {
        "type": "plain",
        "description": "PLAIN authentication mechanism for Kafka and MQTT."
      }
    }
  }
};
