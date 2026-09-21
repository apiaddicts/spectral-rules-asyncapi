module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - Shared $ref",
  },
  channels: {
    orders: {
      address: "orders",
      messages: {
        Order: { $ref: "#/components/messages/Shared" },
        OrderCopy: { $ref: "#/components/messages/Shared" },
      },
    },
  },
  components: {
    messages: {
      Shared: { contentType: "application/json", payload: { type: "object" } },
    },
  },
};
