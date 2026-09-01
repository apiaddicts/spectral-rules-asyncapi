module.exports = {
  asyncapi: "3.0.0",
  info: { title: "Content Type - Components oneOf all compliant", version: "1.0.0" },
  channels: {
    orders: {
      address: "orders",
      messages: {
        Order: { $ref: "#/components/messages/OrderMsg" },
      },
    },
  },
  components: {
    messages: {
      OrderMsg: {
        oneOf: [
          { contentType: "application/json", payload: { type: "object" } },
          { contentType: "application/xml", payload: { type: "object" } },
        ],
      },
    },
  },
};
