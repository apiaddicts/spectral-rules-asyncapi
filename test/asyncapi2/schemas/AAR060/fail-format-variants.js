module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - Format Variants",
  },
  channels: {
    noSuffix: {
      subscribe: {
        message: { contentType: "application/avro", payload: { type: "object" } },
      },
    },
    dashAvro: {
      subscribe: {
        message: { contentType: "application/x-avro", payload: { type: "object" } },
      },
    },
    emptySubtype: {
      subscribe: {
        message: { contentType: "application/+avro", payload: { type: "object" } },
      },
    },
    emptyString: {
      subscribe: {
        message: { contentType: "", payload: { type: "object" } },
      },
    },
    upperPrefix: {
      subscribe: {
        message: { contentType: "APPLICATION/vnd.avro+avro", payload: { type: "object" } },
      },
    },
    upperSuffix: {
      subscribe: {
        message: { contentType: "application/vnd.avro+AVRO", payload: { type: "object" } },
      },
    },
  },
};
