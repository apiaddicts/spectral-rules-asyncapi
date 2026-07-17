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
    }
  }
};
