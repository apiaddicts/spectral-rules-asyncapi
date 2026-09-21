module.exports = {
  asyncapi: "2.6.0",
  info: { version: "1.0.0", title: "Processor Function Name Paired - $ref Operation Ignored" },
  channels: {
    "a-in": { publish: { $ref: "#/components/messages/whatever" } },
    "b-out": { subscribe: { operationId: "produceB", "x-scs-function-name": "proc" } },
  },
};
