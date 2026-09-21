module.exports = {
  asyncapi: "2.6.0",
  info: { version: "1.0.0", title: "Processor Function Name Paired - Lone Producer" },
  channels: {
    "a-in": {
      publish: { operationId: "consumeA", "x-scs-function-name": "loneProcessor" },
    },
  },
};
