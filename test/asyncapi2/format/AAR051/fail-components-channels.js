module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "description": "Petstore API whose operations live under components.channels."
  },
  "channels": {
    "pet/created": {
      "$ref": "#/components/channels/petCreated"
    }
  },
  "components": {
    "channels": {
      "petCreated": {
        "description": "Reusable channel with an operation missing its operationId.",
        "subscribe": {
          "summary": "Receive pet created events.",
          "message": { "payload": { "type": "object" } }
        },
        "publish": {
          "operationId": "On_Pet_Created",
          "summary": "Publish pet created events.",
          "message": { "payload": { "type": "object" } }
        }
      }
    }
  }
};
