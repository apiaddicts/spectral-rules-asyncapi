module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "becaEvt": {
      "address": "beca.evt.alumnos.registro-bonificacion.beca",
      "description": "Classification 'evt' — invalid by default, valid when validValues is extended."
    },
    "becaCmd": {
      "address": "beca.cmd.alumnos.registro-bonificacion.beca",
      "description": "Classification 'cmd' — valid by default, invalid when validValues is restricted to ['evt']."
    }
  }
};
