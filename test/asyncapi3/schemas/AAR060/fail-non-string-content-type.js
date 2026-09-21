module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - Non-string contentType",
  },
  channels: {
    orders: {
      address: "orders",
      messages: {
        numeric: { contentType: 123, payload: { type: "object" } },
        boolean: { contentType: true, payload: { type: "object" } },
      },
    },
  },
};
