module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "becaRegistroBonificacion": {
      "address": "beca.cmd.alumnos.registro-bonificacion.beca",
      "description": "Registro de bonificacion de beca.",
      "messages": {
        "BonificacionRegistrada": {
          "payload": {
            "type": "object",
            "properties": { "id": { "type": "string" } }
          }
        }
      }
    },
    "becaRegistroBonificacionV2": {
      "address": "beca.cmd.alumnos.registro-bonificacion.beca.v2",
      "description": "Version 2 after a breaking change.",
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
  },
  "operations": {
    "onBecaRegistroBonificacion": {
      "action": "receive",
      "channel": { "$ref": "#/channels/becaRegistroBonificacion" }
    }
  }
};
