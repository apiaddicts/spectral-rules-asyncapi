module.exports = {
  asyncapi: "2.6.0",
  info: { title: "Content Type - Components oneOf all compliant", version: "1.0.0" },
  channels: {
    orders: {
      subscribe: {
        message: { $ref: "#/components/messages/OrderMsg" },
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
