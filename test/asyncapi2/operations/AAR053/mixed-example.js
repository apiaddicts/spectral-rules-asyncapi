module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "beca.cmd.alumnos.registro-bonificacion.beca": {
      "description": "Valid 5-segment channel name.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    },
    "beca_cmd.alumnos.registro-bonificacion.beca": {
      "description": "Invalid: underscore in the first segment.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    },
    "beca.cmd.alumnos.registro-bonificacion.beca.v2": {
      "description": "Valid 6-segment (versioned) channel name.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    },
    "beca.cmd.alumnos.registro-bonificacion": {
      "description": "Invalid: only 4 segments.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    }
  }
};
