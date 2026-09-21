module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "X Payload References Well Formed - Pass Scenarios"
  },
  "channels": {
    "beca.evt.alumnos.registro-bonificacion.beca": {
      "subscribe": {
        "message": {
          "payload": {
            "type": "object",
            "properties": { "id": { "type": "string" } }
          },
          "x-payload-references": [
            {
              "subject": "Ciudadano",
              "ref": "https://svn.example.com/schemas/avro/Ciudadano.avsc",
              "referenceName": "org.madrid.core.payload.alumnos.Ciudadano"
            }
          ]
        }
      }
    },
    "beca.evt.alumnos.registro-bonificacion.lenient-scalar": {
      "subscribe": {
        "message": {
          "payload": {
            "type": "object"
          },
          "x-payload-references": [
            {
              "subject": 12345,
              "ref": "https://svn.example.com/schemas/avro/Ciudadano.avsc",
              "referenceName": "org.madrid.core.payload.alumnos.Ciudadano"
            },
            {
              "subject": true,
              "ref": "https://svn.example.com/schemas/avro/Direccion.avsc",
              "referenceName": "org.madrid.core.payload.alumnos.Direccion"
            }
          ]
        }
      }
    }
  }
};
