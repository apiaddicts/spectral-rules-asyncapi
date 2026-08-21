module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - Non-scalar x-scs-group",
  },
  channels: {
    "object.beca": {
      subscribe: {
        operationId: "consumeObject",
        "x-scs-group": { nested: "value" },
      },
    },
    "array.beca": {
      subscribe: {
        operationId: "consumeArray",
        "x-scs-group": ["a", "b"],
      },
    },
  },
};
