module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - No defaultContentType",
  },
  channels: {
    orders: {
      subscribe: {
        message: { contentType: "application/avro+avro", payload: { type: "object" } },
      },
    },
    events: {
      publish: {
        message: { payload: { type: "object" } },
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
