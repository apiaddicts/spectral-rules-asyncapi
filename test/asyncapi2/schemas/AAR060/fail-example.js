module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - Fail Scenarios",
  },
  defaultContentType: "application/json",
  channels: {
    orders: {
      subscribe: {
        operationId: "receiveOrder",
        message: {
          contentType: "application/json",
          payload: { type: "object" },
        },
      },
    },
    events: {
      publish: {
        operationId: "sendEvents",
        message: {
          oneOf: [
            { contentType: "text/plain", payload: { type: "object" } },
            { contentType: "application/vnd.apache.avro+avro", payload: { type: "object" } },
          ],
        },
      },
    },
  },
  components: {
    messages: {
      ReusableBad: {
        contentType: "application/xml",
        payload: { type: "object" },
      },
    },
  },
};
