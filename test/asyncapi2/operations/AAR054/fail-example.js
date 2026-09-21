module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "beca.evt.alumnos.registro-bonificacion.beca": {
      "description": "Classification 'evt' is not one of cdc, cmd, sys.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    },
    "beca.event.alumnos.registro-bonificacion.beca": {
      "description": "Classification 'event' is not one of cdc, cmd, sys.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    },
    "beca.CMD.alumnos.registro-bonificacion.beca": {
      "description": "Classification is uppercase, not an exact match for cmd.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    },
    123.456: {
      "description": "Channel key is a bare numeric literal; JS/JSON always coerce object keys to strings ('123.456'), giving classification '456'.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    }
  }
};
