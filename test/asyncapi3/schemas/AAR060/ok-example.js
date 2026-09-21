module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - OK Scenarios",
  },
  defaultContentType: "application/vnd.apache.avro+avro",
  channels: {
    orders: {
      address: "orders",
      messages: {
        Order: {
          contentType: "application/avro+avro",
          payload: { type: "object" },
        },
        NoContentType: {
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
