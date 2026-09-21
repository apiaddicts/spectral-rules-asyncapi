module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "title": "Swagger Petstore",
    "version": "1.0.0",
    "description": "Petstore API (AsyncAPI 3.x) with degenerate structures around its operations."
  },
  "channels": {
    "petEvents": {
      "address": "pet/events",
      "messages": {
        "PetEvent": { "payload": { "type": "object" } }
      },
      "publish": {
        "operationId": "Not_Evaluated_In_V3"
      }
    }
  },
  "operations": {
    "nullOperation": null,
    "scalarOperation": "notAnObject",
    "emptyOperation": {},
    "validOperation": {
      "action": "send",
      "channel": { "$ref": "#/channels/petEvents" }
    }
  },
  "components": {
    "operations": null
  }
};
