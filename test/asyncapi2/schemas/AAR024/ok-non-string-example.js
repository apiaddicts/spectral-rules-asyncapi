module.exports = {
  asyncapi: "2.6.0",
  info: { title: "Content Type - Non-string is still declared", version: "1.0.0" },
  channels: {
    orders: {
      subscribe: {
        message: {
          contentType: 123,
          payload: { type: "object" },
        },
      },
    },
  },
};
