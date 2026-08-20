module.exports = {
  asyncapi: "2.6.0",
  info: { version: "1.0.0", title: "Numeric Format" },
  channels: {
    invoices: {
      publish: {
        message: {
          payload: {
            type: "object",
            properties: {
              weight: { type: "number", format: "bad" },
              price: { type: "number", format: "double" },
            },
          },
        },
      },
    },
  },
};
