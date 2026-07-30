module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Avro Record Name CamelCase - Fail Scenarios"
  },
  "channels": {
    "flat": {
      "subscribe": {
        "operationId": "receiveFlat",
        "message": {
          "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
          "payload": {
            "type": "record",
            "name": "solicitud_comunicacion",
            "namespace": "org.example.orders",
            "fields": [
              { "name": "id", "type": "string" }
            ]
          }
        }
      }
    },
    "nested": {
      "subscribe": {
        "operationId": "receiveNested",
        "message": {
          "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
          "payload": {
            "type": "record",
            "name": "SolicitudComunicacion",
            "fields": [
              {
                "name": "resultado",
                "type": {
                  "type": "record",
                  "name": "resultado_comunicacion_mail",
                  "fields": [{ "name": "estado", "type": "string" }]
                }
              }
            ]
          }
        }
      }
    },
    "union": {
      "subscribe": {
        "operationId": "receiveUnion",
        "message": {
          "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
          "payload": {
            "type": "record",
            "name": "SolicitudConUnion",
            "fields": [
              {
                "name": "detalle",
                "type": ["null", { "type": "record", "name": "detalle_union", "fields": [{ "name": "valor", "type": "string" }] }]
              }
            ]
          }
        }
      }
    },
    "arrayOfRecords": {
      "subscribe": {
        "operationId": "receiveArray",
        "message": {
          "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
          "payload": {
            "type": "record",
            "name": "SolicitudConArray",
            "fields": [
              {
                "name": "items",
                "type": { "type": "array", "items": { "type": "record", "name": "item_array", "fields": [{ "name": "valor", "type": "string" }] } }
              }
            ]
          }
        }
      }
    },
    "mapOfRecords": {
      "subscribe": {
        "operationId": "receiveMap",
        "message": {
          "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
          "payload": {
            "type": "record",
            "name": "SolicitudConMap",
            "fields": [
              {
                "name": "valores",
                "type": { "type": "map", "values": { "type": "record", "name": "valor_map", "fields": [{ "name": "valor", "type": "string" }] } }
              }
            ]
          }
        }
      }
    },
    "channelA": {
      "subscribe": {
        "operationId": "receiveChannelA",
        "message": {
          "oneOf": [
            { "$ref": "#/components/messages/Shared" },
            {
              "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
              "payload": {
                "type": "record",
                "name": "inline_bad_name",
                "fields": [{ "name": "id", "type": "string" }]
              }
            }
          ]
        }
      }
    },
    "channelB": {
      "publish": {
        "operationId": "publishChannelB",
        "message": { "$ref": "#/components/messages/Shared" }
      }
    }
  },
  "components": {
    "schemas": {
      "OrphanRecord": {
        "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
        "schema": {
          "type": "record",
          "name": "orphan_record_value",
          "fields": [{ "name": "id", "type": "string" }]
        }
      }
    },
    "messages": {
      "Shared": {
        "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
        "payload": {
          "type": "record",
          "name": "shared_bad_name",
          "fields": [{ "name": "id", "type": "string" }]
        }
      }
    }
  }
};
