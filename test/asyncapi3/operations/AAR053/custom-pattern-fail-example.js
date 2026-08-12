module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "violatesCustom1": {
      "address": "beca.cmd.alumnos.registro-bonificacion.beca",
      "description": "Corporate-valid address, but does NOT match the custom pattern; flagged."
    },
    "violatesCustom2": {
      "address": "custom.foo",
      "description": "Only two parts; does NOT match the custom pattern; flagged."
    }
  }
};
