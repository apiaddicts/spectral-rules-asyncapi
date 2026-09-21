module.exports = {
  asyncapi: "2.6.0",
  info: { version: "1.0.0", title: "Content Type Avro - missing on Avro message" },
  channels: {
    orders: {
      subscribe: {
        operationId: "receiveOrder",
        message: {
          schemaFormat: "application/vnd.apache.avro;version=1.9.0",
          payload: {
            type: "record",
            name: "OrderValue",
            namespace: "org.madrid.p001.cmd.orders",
            fields: [{ name: "id", type: "string" }],
          },
        },
      },
    },
    ordersNotAvro: {
      subscribe: {
        operationId: "receiveOrderNotAvro",
        message: { payload: { type: "object" } },
      },
    },
  },
};
