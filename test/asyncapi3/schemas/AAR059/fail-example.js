module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Avro Record Name CamelCase - Fail Scenarios (v3)"
  },
  "channels": {
    "flat": {
      "address": "flat",
      "messages": {
        "flatMessage": {
          "payload": {
            "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
            "schema": {
              "type": "record",
              "name": "solicitud_comunicacion",
              "namespace": "org.example.orders",
              "fields": [{ "name": "id", "type": "string" }]
            }
          }
        }
      }
    },
    "nested": {
      "address": "nested",
      "messages": {
        "nestedMessage": {
          "payload": {
            "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
            "schema": {
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
      }
    },
    "union": {
      "address": "union",
      "messages": {
        "unionMessage": {
          "payload": {
            "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
            "schema": {
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
      }
    },
    "arrayOfRecords": {
      "address": "array-of-records",
      "messages": {
        "arrayMessage": {
          "payload": {
            "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
            "schema": {
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
      }
    },
    "mapOfRecords": {
      "address": "map-of-records",
      "messages": {
        "mapMessage": {
          "payload": {
            "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
            "schema": {
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
      }
    },
    "channelA": {
      "address": "channel-a",
      "messages": {
        "inlineMessage": {
          "payload": {
            "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
            "schema": {
              "type": "record",
              "name": "inline_bad_name",
              "fields": [{ "name": "id", "type": "string" }]
            }
          }
        },
        "sharedMessage": { "$ref": "#/components/messages/Shared" }
      }
    },
    "channelB": {
      "address": "channel-b",
      "messages": {
        "sharedMessage": { "$ref": "#/components/messages/Shared" }
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
        "payload": {
          "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
          "schema": {
            "type": "record",
            "name": "shared_bad_name",
            "fields": [{ "name": "id", "type": "string" }]
          }
        }
      }
    }
  }
};
