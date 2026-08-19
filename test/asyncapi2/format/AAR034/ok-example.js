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
              price: { type: "number", format: "double" },
              count: { type: "integer", format: "int32" },
              quantity: { type: "integer" },
            },
          },
        },
      },
    },
  },
};
