module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "beca.evt.alumnos.registro-bonificacion.beca": {
      "description": "Classification 'evt' — invalid by default, valid when validValues is extended.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    },
    "beca.cmd.alumnos.registro-bonificacion.beca": {
      "description": "Classification 'cmd' — valid by default, invalid when validValues is restricted to ['evt'].",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    }
  }
};
