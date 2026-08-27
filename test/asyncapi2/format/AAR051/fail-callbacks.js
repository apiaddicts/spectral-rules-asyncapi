module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "description": "Petstore API with operations nested inside channel callbacks."
  },
  "channels": {
    "payment/requested": {
      "description": "Channel with callbacks.",
      "publish": {
        "operationId": "notificarPago",
        "summary": "Publish payment requested events.",
        "message": { "payload": { "type": "object" } }
      },
      "callbacks": {
        "onPaymentSettled": {
          "publish": {
            "operationId": "confirmarPago",
            "summary": "Callback with a camelCase operationId.",
            "message": { "payload": { "type": "object" } }
          },
          "subscribe": {
            "summary": "Callback without operationId.",
            "message": { "payload": { "type": "object" } }
          }
        },
        "onPaymentRejected": {
          "publish": {
            "operationId": "Rechazar_Pago",
            "summary": "Callback with an invalid operationId.",
            "message": { "payload": { "type": "object" } }
          }
        },
        "x-internal-callback": {
          "publish": {
            "summary": "Extension key, not a callback, must not be evaluated."
          }
        }
      }
    }
  }
};
