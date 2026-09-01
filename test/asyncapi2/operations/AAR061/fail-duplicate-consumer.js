module.exports = {
  asyncapi: "2.6.0",
  info: { version: "1.0.0", title: "Processor Function Name Paired - Duplicate Consumer" },
  channels: {
    c1: { subscribe: { operationId: "c1", "x-scs-function-name": "dupConsumer" } },
    c2: { subscribe: { operationId: "c2", "x-scs-function-name": "dupConsumer" } },
  },
};
