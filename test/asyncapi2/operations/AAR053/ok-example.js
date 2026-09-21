module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "beca.cmd.alumnos.registro-bonificacion.beca": {
      "description": "Registro de bonificacion de beca.",
      "subscribe": {
        "message": {
          "payload": {
            "type": "object",
            "properties": { "id": { "type": "string" } }
          }
        }
      }
    },
    "beca.cmd.alumnos.registro-bonificacion.beca.v2": {
      "description": "Version 2 of the same channel after a breaking change.",
      "subscribe": {
        "message": {
          "payload": {
            "type": "object",
            "properties": { "id": { "type": "string" } }
          }
        }
      }
    },
    "beca.cmd.alumnos.registro-bonificacion.beca.v3": {
      "description": "Version 3 (version-segment value other than v2).",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    },
    "beca.cmd.alumnos.registro-bonificacion.beca.v10": {
      "description": "Version 10 (multi-digit version segment).",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    }
  }
};
