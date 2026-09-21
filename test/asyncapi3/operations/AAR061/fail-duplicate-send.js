module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Processor Function Name Paired - Duplicate Send" },
  channels: { "b-out": { address: "b.out" } },
  operations: {
    sendA: { action: "send", channel: { $ref: "#/channels/b-out" }, "x-scs-function-name": "dupProducer" },
    sendB: { action: "send", channel: { $ref: "#/channels/b-out" }, "x-scs-function-name": "dupProducer" },
  },
};
