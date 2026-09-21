module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Orders Service"
  },
  "channels": {
    "ordersApp": {
      "subscribe": {
        "operationId": "receiveOrderApp",
        "message": {
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
      "subscribe": {
        "operationId": "receiveOrderCommon",
        "message": {
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
      "subscribe": {
        "operationId": "receiveOrderWrapped",
        "message": {
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
      "subscribe": {
        "operationId": "receiveOrderPlainJsonSchema",
        "message": {
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
      "subscribe": {
        "operationId": "receiveOrderEnumValid",
        "message": {
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
      "subscribe": {
        "operationId": "receiveOrderFixedValid",
        "message": {
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
  }
};
