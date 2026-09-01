module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - message inside a reusable (components) channel",
  },
  channels: {
    orders: { $ref: "#/components/channels/Reusable" },
  },
  components: {
    channels: {
      Reusable: {
        address: "orders",
        messages: {
          Order: {
            contentType: "application/json",
            payload: { type: "object" },
          },
        },
      },
    },
  },
};
