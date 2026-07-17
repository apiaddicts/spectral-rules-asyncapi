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
    }
  }
};
