module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "becaCmd": {
      "address": "beca.cmd.alumnos.registro-bonificacion.beca",
      "description": "Valid — classification 'cmd'."
    },
    "becaEvt": {
      "address": "beca.evt.alumnos.registro-bonificacion.beca",
      "description": "Invalid — classification 'evt'. Only this channel must be flagged."
    },
    "becaSys": {
      "address": "beca.sys.alumnos.registro-bonificacion.beca",
      "description": "Valid — classification 'sys'."
    }
  }
};
