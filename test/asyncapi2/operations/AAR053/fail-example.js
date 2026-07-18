module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "beca_cmd.alumnos.registro-bonificacion.beca": {
      "description": "Channel name contains an underscore.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    },
    "beca.cmd.alumnos.registro-bonificacion": {
      "description": "Channel name has only 4 segments (missing scope).",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    },
    "beca.cmd.alumnos.registro-bonificacion.beca.v2.extra": {
      "description": "Channel name has 7 segments (too many).",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    },
    "-beca.cmd.alumnos.registro-bonificacion.beca": {
      "description": "Channel name has a leading hyphen in the first segment.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    },
    "beca.cmd.alumnos.registro-bonificacion.beca-": {
      "description": "Channel name has a trailing hyphen in the last segment.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    },
    "beca..alumnos.registro-bonificacion.beca": {
      "description": "Channel name has a double dot (empty segment).",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    }
  }
};
