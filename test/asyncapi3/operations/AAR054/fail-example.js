module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "becaInvalidClassification": {
      "address": "beca.evt.alumnos.registro-bonificacion.beca",
      "description": "Classification 'evt' is not one of cdc, cmd, sys."
    },
    "becaMissingSegment": {
      "address": "beca",
      "description": "Address has no classification segment at all."
    },
    "becaUnquotedNumericAddress": {
      "address": 123.456,
      "description": "Address is a bare YAML/JSON number (not a string) once parsed; must still be coerced to text and evaluated, matching the Java check's behavior, instead of being silently skipped."
    },
    "becaUnquotedBooleanAddress": {
      "address": true,
      "description": "Address is a bare YAML/JSON boolean (not a string) once parsed; must still be coerced to text and evaluated, instead of being silently skipped."
    }
  }
};
