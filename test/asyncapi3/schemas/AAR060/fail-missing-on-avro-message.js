module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Content Type Avro - missing on Avro message" },
  channels: {
    orders: {
      address: "orders",
      messages: {
        OrderValue: {
          payload: {
            schemaFormat: "application/vnd.apache.avro;version=1.9.0",
            schema: {
              type: "record",
              name: "OrderValue",
              namespace: "org.madrid.p001.cmd.orders",
              fields: [{ name: "id", type: "string" }],
            },
          },
        },
        NotAvro: {
          payload: { type: "object" },
        },
      },
    },
  },
};
