module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "X Payload References Well Formed - Pass Scenarios"
  },
  "channels": {
    "scholarshipRegistration": {
      "address": "beca.evt.alumnos.registro-bonificacion.beca",
      "messages": {
        "Registration": {
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
    "scholarshipRegistrationLenientScalar": {
      "address": "beca.evt.alumnos.registro-bonificacion.lenient-scalar",
      "messages": {
        "Registration": {
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
