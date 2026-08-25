module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Processor Function Name Paired - Null/Non-object Operation" },
  channels: { "a-in": { address: "a.in" } },
  operations: {
    "null-op": null,
    "scalar-op": "just-a-string",
    r1: { action: "receive", channel: { $ref: "#/channels/a-in" }, "x-scs-function-name": "onlyConsumer" },
  },
};
