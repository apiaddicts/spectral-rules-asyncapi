module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - Kafka bindings without a usable groupId",
  },
  channels: {
    "alta-beca": { address: "alta.beca" },
  },
  operations: {
    consumeNoGroupId: {
      action: "receive",
      channel: { $ref: "#/channels/alta-beca" },
      bindings: {
        kafka: {
          bindingVersion: "0.5.0",
        },
      },
    },
    consumeEmptyGroupId: {
      action: "receive",
      channel: { $ref: "#/channels/alta-beca" },
      bindings: {
        kafka: {
          groupId: "",
        },
      },
    },
  },
};
