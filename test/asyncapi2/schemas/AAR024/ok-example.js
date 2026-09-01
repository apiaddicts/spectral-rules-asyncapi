module.exports = {
  asyncapi: "2.6.0",
  info: { title: "Content Type - Pass", version: "1.0.0" },
  channels: {
    orders: {
      subscribe: {
        message: {
          contentType: "application/json",
          payload: { type: "object", properties: { id: { type: "string" } } },
        },
      },
    },
  },
  components: {
    messages: {
      OrderCreated: {
        contentType: "application/json",
        payload: { type: "object" },
      },
    },
  },
};
