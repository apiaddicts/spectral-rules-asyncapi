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
    },
    "becaHyphenStart": {
      "address": "-beca.cmd.alumnos.registro-bonificacion.beca",
      "description": "Address has a leading hyphen in the first segment."
    },
    "becaHyphenEnd": {
      "address": "beca.cmd.alumnos.registro-bonificacion.beca-",
      "description": "Address has a trailing hyphen in the last segment."
    },
    "becaExtraSegment": {
      "address": "beca.cmd.alumnos.registro-bonificacion.beca.v2.extra",
      "description": "Address has 7 segments (too many)."
    },
    "becaUppercase": {
      "address": "beca.Cmd.alumnos.registro-bonificacion.beca",
      "description": "Address has an uppercase letter in a segment."
    },
    "becaDoubleHyphen": {
      "address": "beca.cmd.alumnos.registro--bonificacion.beca",
      "description": "Address has a double internal hyphen."
    },
    "becaUnicode": {
      "address": "becañ.cmd.alumnos.registro-bonificacion.beca",
      "description": "Address has a non-ASCII (accented) character in a segment."
    },
    "becaNonStringNumber": {
      "address": 12345,
      "description": "Address is a number, not a string."
    },
    "becaNonStringBoolean": {
      "address": true,
      "description": "Address is a boolean, not a string."
    }
  }
};
