module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "beca.cmd.alumnos.registro-bonificacion.beca": {
      "description": "Valid — classification 'cmd'.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    },
    "beca.evt.alumnos.registro-bonificacion.beca": {
      "description": "Invalid — classification 'evt'. Only this channel must be flagged.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    },
    "beca.sys.alumnos.registro-bonificacion.beca": {
      "description": "Valid — classification 'sys'.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    }
  }
};
