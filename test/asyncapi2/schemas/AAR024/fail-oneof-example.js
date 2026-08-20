module.exports = {
  asyncapi: "2.6.0",
  info: { title: "Content Type - oneOf members", version: "1.0.0" },
  channels: {
    orders: {
      subscribe: {
        message: {
          oneOf: [
            { contentType: "application/json", payload: { type: "object" } },
            { payload: { type: "object" } },
          ],
        },
      },
    },
  },
};
