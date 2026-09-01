module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - Null contentType",
  },
  defaultContentType: null,
  channels: {
    orders: {
      subscribe: {
        message: { contentType: null, payload: { type: "object" } },
      },
    },
  },
};
