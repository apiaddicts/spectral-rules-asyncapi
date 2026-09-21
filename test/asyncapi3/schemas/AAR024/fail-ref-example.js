module.exports = {
  asyncapi: "3.0.0",
  info: { title: "Content Type - Shared $ref counted once", version: "1.0.0" },
  channels: {
    orders: {
      address: "orders",
      messages: {
        Order: { $ref: "#/components/messages/OrderCreated" },
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
