module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Processor Function Name Paired - Coercion Paired" },
  channels: { "a-in": { address: "a.in" }, "b-out": { address: "b.out" } },
  operations: {
    s1: { action: "send", channel: { $ref: "#/channels/b-out" }, "x-scs-function-name": 123 },
    r1: { action: "receive", channel: { $ref: "#/channels/a-in" }, "x-scs-function-name": 123 },
  },
};
