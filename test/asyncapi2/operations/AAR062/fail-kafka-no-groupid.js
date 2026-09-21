module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - Kafka bindings without a usable groupId",
  },
  channels: {
    "no-groupid.beca": {
      subscribe: {
        operationId: "consumeNoGroupId",
        bindings: {
          kafka: {
            bindingVersion: "0.5.0",
          },
        },
      },
    },
    "empty-groupid.beca": {
      subscribe: {
        operationId: "consumeEmptyGroupId",
        bindings: {
          kafka: {
            groupId: "",
          },
        },
      },
    },
  },
};
