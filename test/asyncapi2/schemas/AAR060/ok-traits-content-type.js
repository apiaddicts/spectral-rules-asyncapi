module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - trait contentType valid / overridden by the message",
  },
  channels: {
    fromTrait: {
      subscribe: {
        message: {
          traits: [{ contentType: "application/vnd.apache.avro+avro" }],
          payload: { type: "object" },
        },
      },
    },
    ownWins: {
      publish: {
        message: {
          contentType: "application/avro+avro",
          traits: [{ contentType: "application/json" }],
          payload: { type: "object" },
        },
      },
    },
  },
};
