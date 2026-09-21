module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - Null contentType",
  },
  defaultContentType: null,
  channels: {
    orders: {
      address: "orders",
      messages: {
        Order: { contentType: null, payload: { type: "object" } },
      },
    },
  },
};
