module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Processor Function Name Paired - Null Value Ignored" },
  channels: { "a-in": { address: "a.in" } },
  operations: {
    consumeA: {
      action: "receive",
      channel: { $ref: "#/channels/a-in" },
      "x-scs-function-name": null,
    },
  },
};
