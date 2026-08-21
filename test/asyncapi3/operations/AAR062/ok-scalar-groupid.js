module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - Scalar kafka groupId is accepted",
  },
  channels: {
    "alta-beca": { address: "alta.beca" },
  },
  operations: {
    consumeScalar: {
      action: "receive",
      channel: { $ref: "#/channels/alta-beca" },
      bindings: {
        kafka: {
          groupId: "alta.beca.1",
        },
      },
    },
  },
};
