module.exports = {
  asyncapi: "2.6.0",
  info: { version: "1.0.0", title: "Processor Function Name Paired - Null/Non-object Channel" },
  channels: {
    "null-channel": null,
    "scalar-channel": "just-a-string",
    lone: { subscribe: { operationId: "loneOp", "x-scs-function-name": "onlyConsumer" } },
  },
};
