module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Orders Service"
  },
  "channels": {
    "ordersWrongDomain": {
      "subscribe": {
        "operationId": "receiveOrderWrongDomain",
        "message": {
          "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
          "payload": {
            "type": "record",
            "name": "OrderValue",
            "namespace": "org.example.orders",
            "fields": [
              { "name": "id", "type": "string" }
            ]
          }
        }
      }
    },
    "ordersEmptyNamespace": {
      "subscribe": {
        "operationId": "receiveOrderEmptyNamespace",
        "message": {
          "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
          "payload": {
            "type": "record",
            "name": "OrderValue",
            "namespace": "",
            "fields": [
              { "name": "id", "type": "string" }
            ]
          }
        }
      }
    },
    "ordersViaRef": {
      "subscribe": {
        "operationId": "receiveOrderViaRef",
        "message": {
          "$ref": "#/components/messages/OrderMessage"
        }
      }
    }
  },
  "components": {
    "messages": {
      "OrderMessage": {
        "schemaFormat": "application/vnd.apache.avro;version=1.9.0",
        "payload": {
          "type": "record",
          "name": "OrderValue",
          "namespace": "org.example.orders",
          "fields": [
            { "name": "id", "type": "string" }
          ]
        }
      }
    }
  }
};
