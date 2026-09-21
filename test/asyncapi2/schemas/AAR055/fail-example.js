module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "X Payload References Well Formed - Fail Scenarios"
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
    "beca.evt.alumnos.registro-bonificacion.not-array": {
      "subscribe": {
        "message": {
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
    "beca.evt.alumnos.registro-bonificacion.item-not-object": {
      "subscribe": {
        "message": {
          "payload": {
            "type": "object"
          },
          "x-payload-references": ["just a string"]
        }
      }
    },
    "beca.evt.alumnos.registro-bonificacion.field-wrong-type": {
      "subscribe": {
        "message": {
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
    "beca.evt.alumnos.registro-bonificacion.multiple-occurrences": {
      "subscribe": {
        "message": {
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
    "beca.evt.alumnos.registro-bonificacion.invalid-ref": {
      "subscribe": {
        "message": {
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
    "beca.evt.alumnos.registro-bonificacion.invalid-reference-name": {
      "subscribe": {
        "message": {
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
    "beca.evt.alumnos.registro-bonificacion.invalid-subject": {
      "subscribe": {
        "message": {
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
    "beca.evt.alumnos.registro-bonificacion.reviewer-example": {
      "subscribe": {
        "message": {
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
