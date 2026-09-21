module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - contentType declared only in a trait",
  },
  channels: {
    orders: {
      address: "orders",
      messages: {
        Order: {
          traits: [{ contentType: "application/json" }],
          payload: { type: "object" },
        },
      },
    },
  },
};
