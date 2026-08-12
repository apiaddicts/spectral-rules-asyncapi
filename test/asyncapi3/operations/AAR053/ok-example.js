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
    },
    "becaRegistroBonificacionV3": {
      "address": "beca.cmd.alumnos.registro-bonificacion.beca.v3",
      "description": "Version 3 (version-segment value other than v2)."
    },
    "becaRegistroBonificacionV10": {
      "address": "beca.cmd.alumnos.registro-bonificacion.beca.v10",
      "description": "Version 10 (multi-digit version segment)."
    },
    "beca.cmd.alumnos.consulta-saldo.beca": {
      "description": "AsyncAPI 3 channel with no 'address' field; the valid channel key is validated instead."
    }
  },
  "operations": {
    "onBecaRegistroBonificacion": {
      "action": "receive",
      "channel": { "$ref": "#/channels/becaRegistroBonificacion" }
    }
  }
};
