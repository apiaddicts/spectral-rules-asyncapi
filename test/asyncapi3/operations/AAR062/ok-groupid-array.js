module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - Array groupId is a declared group",
  },
  channels: {
    "array-beca": { address: "array.beca" },
  },
  operations: {
    consumeArray: {
      action: "receive",
      channel: { $ref: "#/channels/array-beca" },
      bindings: {
        kafka: {
          groupId: ["array.beca.1", "array.beca.2"],
        },
      },
    },
  },
};
