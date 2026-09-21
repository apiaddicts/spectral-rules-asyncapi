module.exports = {
  asyncapi: "3.0.0",
  info: { title: "Content Type - Pass", version: "1.0.0" },
  channels: {
    orders: {
      address: "orders",
      messages: {
        Order: {
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
