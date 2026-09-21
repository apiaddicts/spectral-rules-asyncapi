module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - Non-scalar x-scs-group",
  },
  channels: {
    "alta-beca": { address: "alta.beca" },
  },
  operations: {
    consumeObject: {
      action: "receive",
      channel: { $ref: "#/channels/alta-beca" },
      "x-scs-group": { nested: "value" },
    },
    consumeArray: {
      action: "receive",
      channel: { $ref: "#/channels/alta-beca" },
      "x-scs-group": ["a", "b"],
    },
  },
};
