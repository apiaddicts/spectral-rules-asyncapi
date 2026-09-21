module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - Shared $ref",
  },
  channels: {
    a: {
      subscribe: { message: { $ref: "#/components/messages/Shared" } },
    },
    b: {
      publish: { message: { $ref: "#/components/messages/Shared" } },
    },
  },
  components: {
    messages: {
      Shared: { contentType: "application/json", payload: { type: "object" } },
    },
  },
};
