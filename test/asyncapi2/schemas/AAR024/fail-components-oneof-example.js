module.exports = {
  asyncapi: "2.6.0",
  info: { title: "Content Type - Components oneOf", version: "1.0.0" },
  channels: {},
  components: {
    messages: {
      OrderMsg: {
        oneOf: [
          { contentType: "application/json", payload: { type: "object" } },
          { payload: { type: "object" } },
        ],
      },
    },
  },
};
