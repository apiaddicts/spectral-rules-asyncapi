module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - OK Scenarios",
  },
  defaultContentType: "application/vnd.apache.avro+avro",
  channels: {
    orders: {
      subscribe: {
        operationId: "receiveOrder",
        message: {
          contentType: "application/avro+avro",
          payload: { type: "object" },
        },
      },
    },
    events: {
      publish: {
        operationId: "sendEvents",
        message: {
          payload: { type: "object" },
        },
      },
    },
  },
  components: {
    messages: {
      Reusable: {
        contentType: "application/vnd.apache.avro+avro",
        payload: { type: "object" },
      },
    },
  },
};
