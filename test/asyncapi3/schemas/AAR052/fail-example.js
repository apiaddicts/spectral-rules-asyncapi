module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "title": "Orders Service",
    "version": "1.0.0"
  },
  "channels": {
    "ordersWrongDomain": {
      "address": "orders/wrong-domain",
      "messages": {
        "OrderValue": {
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
      "address": "orders/empty-namespace",
      "messages": {
        "OrderValue": {
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
      "address": "orders/via-ref",
      "messages": {
        "OrderMessage": {
          "$ref": "#/components/messages/OrderMessage"
        }
      }
    }
  },
  "operations": {
    "receiveOrderWrongDomain": {
      "action": "receive",
      "channel": { "$ref": "#/channels/ordersWrongDomain" }
    },
    "receiveOrderEmptyNamespace": {
      "action": "receive",
      "channel": { "$ref": "#/channels/ordersEmptyNamespace" }
    },
    "receiveOrderViaRef": {
      "action": "receive",
      "channel": { "$ref": "#/channels/ordersViaRef" }
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
