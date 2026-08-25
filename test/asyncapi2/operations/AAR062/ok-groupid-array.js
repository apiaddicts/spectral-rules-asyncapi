module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - Array groupId is a declared group",
  },
  channels: {
    "array.beca": {
      subscribe: {
        operationId: "consumeArray",
        bindings: {
          kafka: {
            groupId: ["array.beca.1", "array.beca.2"],
          },
        },
      },
    },
  },
};
