module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - trait contentType valid / overridden by the message",
  },
  channels: {
    orders: {
      address: "orders",
      messages: {
        FromTrait: {
          traits: [{ contentType: "application/vnd.apache.avro+avro" }],
          payload: { type: "object" },
        },
        OwnWins: {
          // The message's own (valid) contentType takes precedence over an invalid trait.
          contentType: "application/avro+avro",
          traits: [{ contentType: "application/json" }],
          payload: { type: "object" },
        },
      },
    },
  },
};
