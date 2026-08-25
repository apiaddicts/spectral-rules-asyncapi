module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - oneOf in subscribe",
  },
  channels: {
    inbound: {
      subscribe: {
        message: {
          oneOf: [
            { contentType: "application/json", payload: { type: "object" } },
            { $ref: "#/components/messages/SharedBad" },
            { contentType: "application/avro+avro", payload: { type: "object" } },
          ],
        },
      },
    },
  },
  components: {
    messages: {
      SharedBad: { contentType: "application/xml", payload: { type: "object" } },
    },
  },
};
