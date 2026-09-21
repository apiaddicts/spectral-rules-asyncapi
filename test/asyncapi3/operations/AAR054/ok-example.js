module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "becaCdc": {
      "address": "beca.cdc.alumnos.registro-bonificacion.beca",
      "description": "Change Data Capture topic.",
      "messages": {
        "BonificacionRegistrada": {
          "payload": {
            "type": "object",
            "properties": { "id": { "type": "string" } }
          }
        }
      }
    },
    "becaCmd": {
      "address": "beca.cmd.alumnos.registro-bonificacion.beca",
      "description": "Command topic that triggers a domain modification.",
      "messages": {
        "BonificacionRegistrada": {
          "payload": {
            "type": "object",
            "properties": { "id": { "type": "string" } }
          }
        }
      }
    },
    "becaSys": {
      "address": "beca.sys.alumnos.registro-bonificacion.beca",
      "description": "Internal system topic.",
      "messages": {
        "BonificacionRegistrada": {
          "payload": {
            "type": "object",
            "properties": { "id": { "type": "string" } }
          }
        }
      }
    },
    "dynamicReplyChannel": {
      "address": null,
      "description": "Channel with no fixed address; must be skipped, not flagged."
    }
  }
};
