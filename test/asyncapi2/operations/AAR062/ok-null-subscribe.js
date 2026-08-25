module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - Null subscribe node is skipped",
  },
  channels: {
    "empty.beca": {
      subscribe: null,
    },
    "producer.beca": {
      publish: { operationId: "produceOnly" },
    },
  },
};
