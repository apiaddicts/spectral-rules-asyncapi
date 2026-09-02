module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "title": "Swagger Petstore",
    "version": "1.0.0",
    "description": "Petstore API (AsyncAPI 3.x) without operations."
  },
  "channels": {
    "petEvents": {
      "address": "pet/events",
      "messages": {
        "PetEvent": { "payload": { "type": "object" } }
      }
    }
  }
};
