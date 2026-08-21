module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - Empty x-scs-group",
  },
  channels: {
    "alta-beca": { address: "alta.beca" },
  },
  operations: {
    consumeEmpty: {
      action: "receive",
      channel: { $ref: "#/channels/alta-beca" },
      "x-scs-group": "",
    },
    consumeWhitespace: {
      action: "receive",
      channel: { $ref: "#/channels/alta-beca" },
      "x-scs-group": "   ",
    },
  },
};
