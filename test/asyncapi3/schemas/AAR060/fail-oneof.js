module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - v3 message-level oneOf is descended",
  },
  channels: {
    orders: {
      address: "orders",
      messages: {
        Multi: {
          oneOf: [
            { contentType: "application/json", payload: { type: "object" } },
            { contentType: "application/avro+avro", payload: { type: "object" } },
          ],
        },
      },
    },
  },
};
