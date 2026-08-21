module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Processor Function Name Paired - Unbalanced Excess Send" },
  channels: { "a-in": { address: "a.in" }, "b-out": { address: "b.out" } },
  operations: {
    s1: { action: "send", channel: { $ref: "#/channels/b-out" }, "x-scs-function-name": "proc" },
    s2: { action: "send", channel: { $ref: "#/channels/b-out" }, "x-scs-function-name": "proc" },
    r1: { action: "receive", channel: { $ref: "#/channels/a-in" }, "x-scs-function-name": "proc" },
  },
};
