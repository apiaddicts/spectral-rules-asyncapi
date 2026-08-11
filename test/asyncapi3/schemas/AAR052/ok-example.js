module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "title": "Orders Service",
    "version": "1.0.0"
  },
  "channels": {
    "ordersApp": {
      "address": "orders/app",
      "messages": {
        "OrderValue": {
          "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
          "payload": {
            "type": "record",
            "name": "OrderValue",
            "namespace": "org.madrid.p001.core.orders",
            "fields": [
              { "name": "id", "type": "string" }
            ]
          }
        }
      }
    },
    "ordersCommon": {
      "address": "orders/common",
      "messages": {
        "OrderValue": {
          "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
          "payload": {
            "type": "record",
            "name": "OrderValue",
            "namespace": "org.madrid.common.orders",
            "fields": [
              { "name": "id", "type": "string" }
            ]
          }
        }
      }
    },
    "ordersWrapped": {
      "address": "orders/wrapped",
      "messages": {
        "OrderValue": {
          "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
          "payload": {
            "schema": {
              "type": "record",
              "name": "OrderValue",
              "namespace": "org.madrid.p001.core.orders",
              "fields": [
                { "name": "id", "type": "string" }
              ]
            }
          }
        }
      }
    },
    "ordersPlainJsonSchema": {
      "address": "orders/plain-json-schema",
      "messages": {
        "OrderValue": {
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "properties": {
              "orderId": { "type": "string", "minLength": 1, "maxLength": 50 }
            }
          }
        }
      }
    },
    "ordersEnumValid": {
      "address": "orders/enum-valid",
      "messages": {
        "OrderValue": {
          "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
          "payload": {
            "type": "enum",
            "name": "OrderStatus",
            "namespace": "org.madrid.p001.core.orders",
            "symbols": ["NEW", "SHIPPED"]
          }
        }
      }
    },
    "ordersFixedValid": {
      "address": "orders/fixed-valid",
      "messages": {
        "OrderValue": {
          "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
          "payload": {
            "type": "fixed",
            "name": "OrderHash",
            "namespace": "org.madrid.p001.core.orders",
            "size": 16
          }
        }
      }
    }
  },
  "operations": {
    "receiveOrderApp": {
      "action": "receive",
      "channel": { "$ref": "#/channels/ordersApp" }
    },
    "receiveOrderCommon": {
      "action": "receive",
      "channel": { "$ref": "#/channels/ordersCommon" }
    },
    "receiveOrderWrapped": {
      "action": "receive",
      "channel": { "$ref": "#/channels/ordersWrapped" }
    },
    "receiveOrderPlainJsonSchema": {
      "action": "receive",
      "channel": { "$ref": "#/channels/ordersPlainJsonSchema" }
    }
  }
};
