module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - Non-string contentType",
  },
  channels: {
    numeric: {
      subscribe: {
        message: { contentType: 123, payload: { type: "object" } },
      },
    },
    boolean: {
      subscribe: {
        message: { contentType: true, payload: { type: "object" } },
      },
    },
  },
};
