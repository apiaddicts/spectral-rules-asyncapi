module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - Fail Scenarios",
  },
  defaultContentType: "application/json",
  channels: {
    orders: {
      address: "orders",
      messages: {
        Order: {
          contentType: "application/json",
          payload: { type: "object" },
        },
      },
    },
  },
  components: {
    messages: {
      ReusableBad: {
        contentType: "application/xml",
        payload: { type: "object" },
      },
    },
  },
};
