module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - Format Variants",
  },
  channels: {
    orders: {
      address: "orders",
      messages: {
        noSuffix: { contentType: "application/avro", payload: { type: "object" } },
        dashAvro: { contentType: "application/x-avro", payload: { type: "object" } },
        emptySubtype: { contentType: "application/+avro", payload: { type: "object" } },
        emptyString: { contentType: "", payload: { type: "object" } },
        upperPrefix: { contentType: "APPLICATION/vnd.avro+avro", payload: { type: "object" } },
        upperSuffix: { contentType: "application/vnd.avro+AVRO", payload: { type: "object" } },
      },
    },
  },
};
