module.exports = {
  asyncapi: "3.0.0",
  info: { title: "Content Type - Reusable channel", version: "1.0.0" },
  channels: {
    orders: { $ref: "#/components/channels/orders" },
  },
  components: {
    channels: {
      orders: {
        address: "orders",
        messages: {
          Order: { payload: { type: "object" } },
        },
      },
    },
  },
};
