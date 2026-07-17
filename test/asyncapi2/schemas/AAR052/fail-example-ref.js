module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Orders Service"
  },
  "channels": {
    "orders": {
      "subscribe": {
        "operationId": "receiveOrder",
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
