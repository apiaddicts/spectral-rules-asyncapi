module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - $ref subscribe operation is skipped",
  },
  channels: {
    "ref.beca": {
      subscribe: { $ref: "#/channels/target.beca/subscribe" },
    },
    "target.beca": {
      subscribe: {
        operationId: "consumeTarget",
        "x-scs-group": "target.beca.1",
      },
    },
  },
};
