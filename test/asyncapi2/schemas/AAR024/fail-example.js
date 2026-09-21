module.exports = {
  asyncapi: "2.6.0",
  info: { title: "Content Type - Fail", version: "1.0.0" },
  channels: {
    orders: {
      subscribe: {
        message: {
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
