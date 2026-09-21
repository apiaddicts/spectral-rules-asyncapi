module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - Non-receive operations are skipped",
  },
  channels: {
    "alta-beca": { address: "alta.beca" },
  },
  operations: {
    brokenOperation: null,
    noAction: {
      channel: { $ref: "#/channels/alta-beca" },
    },
    produceSalida: {
      action: "send",
      channel: { $ref: "#/channels/alta-beca" },
    },
  },
};
