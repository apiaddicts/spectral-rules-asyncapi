module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "beca.cmd.alumnos.registro-bonificacion.beca": {
      "description": "Corporate-valid, but does NOT match the custom pattern; flagged.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    },
    "custom.foo": {
      "description": "Only two parts; does NOT match the custom pattern; flagged.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    }
  }
};
