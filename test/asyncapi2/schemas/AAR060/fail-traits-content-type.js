module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - contentType declared only in a trait",
  },
  channels: {
    orders: {
      subscribe: {
        message: {
          traits: [{ contentType: "application/json" }],
          payload: { type: "object" },
        },
      },
    },
  },
};
