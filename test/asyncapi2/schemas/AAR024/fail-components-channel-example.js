module.exports = {
  asyncapi: "2.6.0",
  info: { title: "Content Type - Reusable channel", version: "1.0.0" },
  channels: {
    orders: { $ref: "#/components/channels/orders" },
  },
  components: {
    channels: {
      orders: {
        subscribe: {
          message: { payload: { type: "object" } },
        },
      },
    },
  },
};
