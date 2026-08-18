module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "X Payload References Well Formed - Fail Scenarios"
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
              "referenceName": "org.madrid.core.payload.alumnos.Ciudadano"
            },
            {
              "subject": "",
              "ref": "https://svn.example.com/schemas/avro/Otro.avsc",
              "referenceName": "org.madrid.core.payload.otro.Otro"
            }
          ]
        }
      }
    },
    "scholarshipRegistrationNotArray": {
      "address": "beca.evt.alumnos.registro-bonificacion.not-array",
      "messages": {
        "Registration": {
          "payload": {
            "type": "object"
          },
          "x-payload-references": {
            "subject": "Ciudadano",
            "ref": "https://svn.example.com/schemas/avro/Ciudadano.avsc",
            "referenceName": "org.madrid.core.payload.alumnos.Ciudadano"
          }
        }
      }
    },
    "scholarshipRegistrationItemNotObject": {
      "address": "beca.evt.alumnos.registro-bonificacion.item-not-object",
      "messages": {
        "Registration": {
          "payload": {
            "type": "object"
          },
          "x-payload-references": ["just a string"]
        }
      }
    },
    "scholarshipRegistrationFieldWrongType": {
      "address": "beca.evt.alumnos.registro-bonificacion.field-wrong-type",
      "messages": {
        "Registration": {
          "payload": {
            "type": "object"
          },
          "x-payload-references": [
            {
              "subject": { "nested": true },
              "ref": "https://svn.example.com/schemas/avro/Ciudadano.avsc",
              "referenceName": "org.madrid.core.payload.alumnos.Ciudadano"
            },
            {
              "subject": ["a", "b"],
              "ref": "https://svn.example.com/schemas/avro/Direccion.avsc",
              "referenceName": "org.madrid.core.payload.alumnos.Direccion"
            }
          ]
        }
      }
    },
    "scholarshipRegistrationMultipleOccurrences": {
      "address": "beca.evt.alumnos.registro-bonificacion.multiple-occurrences",
      "messages": {
        "Registration": {
          "payload": {
            "type": "object"
          },
          "x-payload-references": [
            {
              "subject": "Ciudadano",
              "referenceName": "org.madrid.core.payload.alumnos.Ciudadano"
            }
          ]
        }
      }
    },
    "scholarshipRegistrationInvalidRef": {
      "address": "beca.evt.alumnos.registro-bonificacion.invalid-ref",
      "messages": {
        "Registration": {
          "payload": {
            "type": "object"
          },
          "x-payload-references": [
            {
              "subject": "Ciudadano",
              "ref": "no-es-url",
              "referenceName": "org.madrid.core.payload.alumnos.Ciudadano"
            }
          ]
        }
      }
    },
    "scholarshipRegistrationInvalidReferenceName": {
      "address": "beca.evt.alumnos.registro-bonificacion.invalid-reference-name",
      "messages": {
        "Registration": {
          "payload": {
            "type": "object"
          },
          "x-payload-references": [
            {
              "subject": "Ciudadano",
              "ref": "https://svn.example.com/schemas/avro/Ciudadano.avsc",
              "referenceName": "cualquier_cosa"
            }
          ]
        }
      }
    },
    "scholarshipRegistrationInvalidSubject": {
      "address": "beca.evt.alumnos.registro-bonificacion.invalid-subject",
      "messages": {
        "Registration": {
          "payload": {
            "type": "object"
          },
          "x-payload-references": [
            {
              "subject": "has space",
              "ref": "https://svn.example.com/schemas/avro/Ciudadano.avsc",
              "referenceName": "org.madrid.core.payload.alumnos.Ciudadano"
            }
          ]
        }
      }
    },
    "scholarshipRegistrationReviewerExample": {
      "address": "beca.evt.alumnos.registro-bonificacion.reviewer-example",
      "messages": {
        "Registration": {
          "payload": {
            "type": "object"
          },
          "x-payload-references": [
            {
              "subject": "x",
              "ref": "no-es-url",
              "referenceName": "cualquier_cosa"
            }
          ]
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Ciudadano": {
        "type": "object",
        "x-payload-references": [
          {
            "subject": "Ciudadano",
            "ref": "https://svn.example.com/schemas/avro/Ciudadano.avsc"
          }
        ]
      }
    }
  }
};
