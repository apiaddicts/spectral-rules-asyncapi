module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - $ref operation is skipped",
  },
  channels: {
    "alta-beca": { address: "alta.beca" },
  },
  operations: {
    refOperation: { $ref: "#/components/operations/sharedConsumer" },
    produceSalida: {
      action: "send",
      channel: { $ref: "#/channels/alta-beca" },
    },
  },
  components: {
    operations: {
      sharedConsumer: {
        action: "receive",
        channel: { $ref: "#/channels/alta-beca" },
        "x-scs-group": "alta.beca.1",
      },
    },
  },
};
