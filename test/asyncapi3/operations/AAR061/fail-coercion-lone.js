module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Processor Function Name Paired - Non-string Lone Value" },
  channels: { "a-in": { address: "a.in" } },
  operations: {
    r1: { action: "receive", channel: { $ref: "#/channels/a-in" }, "x-scs-function-name": true },
  },
};
