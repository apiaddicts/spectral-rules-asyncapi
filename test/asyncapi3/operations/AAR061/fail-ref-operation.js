module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Processor Function Name Paired - $ref Operation Ignored" },
  channels: { "a-in": { address: "a.in" } },
  operations: {
    refOp: { $ref: "#/components/operations/whatever" },
    r1: { action: "receive", channel: { $ref: "#/channels/a-in" }, "x-scs-function-name": "proc" },
  },
};
