module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "beca": {
      "description": "Channel key with no dot at all — there is no 2nd (classification) segment.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    },
    "beca..alumnos.registro-bonificacion.beca": {
      "description": "Double dot — the 2nd segment is an empty string, which is not a valid classification.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    }
  }
};
