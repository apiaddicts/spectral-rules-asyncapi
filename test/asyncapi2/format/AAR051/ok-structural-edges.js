module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "description": "Petstore API with degenerate structures around its operations."
  },
  "channels": {
    "empty/channel": {},
    "null/channel": null,
    "scalar/channel": "notAnObject",
    "null/operations": {
      "description": "Channel whose operations are explicitly null.",
      "publish": null,
      "subscribe": null
    },
    "scalar/operation": {
      "description": "Channel whose operation is not an object.",
      "publish": "notAnObject"
    },
    "pet/created": {
      "description": "Valid channel proving the walk continues.",
      "publish": {
        "operationId": "publicarEvento",
        "summary": "Publish pet created events.",
        "message": { "payload": { "type": "object" } }
      }
    }
  },
  "components": {}
};
