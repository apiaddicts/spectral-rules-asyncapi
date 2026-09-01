module.exports = {
  asyncapi: "3.0.0",
  info: { title: "Content Type - Fail", version: "1.0.0" },
  channels: {
    orders: {
      address: "orders",
      messages: {
        Order: {
          payload: { type: "object" },
        },
      },
    },
  },
  components: {
    messages: {
      OrderCreated: {
        payload: { type: "object" },
      },
    },
  },
};
