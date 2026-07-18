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
    }
  }
};
