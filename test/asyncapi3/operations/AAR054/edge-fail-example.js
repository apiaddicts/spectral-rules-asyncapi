module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "becaUppercase": {
      "address": "beca.Cmd.alumnos.registro-bonificacion.beca",
      "description": "Classification 'Cmd' is uppercase; the match is case-sensitive, so it is invalid."
    },
    "becaEmptySegment": {
      "address": "beca..alumnos.registro-bonificacion.beca",
      "description": "Double dot — the 2nd segment is an empty string, which is not a valid classification."
    }
  }
};
