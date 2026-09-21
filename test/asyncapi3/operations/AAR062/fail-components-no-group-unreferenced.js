module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - Unreferenced component operation without group",
  },
  channels: {
    "salida-beca": { address: "salida.beca" },
  },
  operations: {
    produceSalida: {
      action: "send",
      channel: { $ref: "#/channels/salida-beca" },
    },
  },
  components: {
    operations: {
      unusedConsumerNoGroup: {
        action: "receive",
        channel: { $ref: "#/channels/salida-beca" },
      },
    },
  },
};
