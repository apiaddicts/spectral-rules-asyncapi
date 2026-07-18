module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "becaWithUnderscore": {
      "address": "beca_cmd.alumnos.registro-bonificacion.beca",
      "description": "Address contains an underscore."
    },
    "becaMissingSegment": {
      "address": "beca.cmd.alumnos.registro-bonificacion",
      "description": "Address has only 4 segments."
    },
    "becaEmptyAddress": {
      "address": "",
      "description": "Address is an empty string."
    }
  }
};
