module.exports = {
  asyncapi: "2.6.0",
  info: { version: "1.0.0", title: "Avro Namespace Pattern - message-level schemaFormat wrapper" },
  channels: {
    ordersOk: {
      subscribe: {
        operationId: "receiveOrderOk",
        message: {
          schemaFormat: "application/vnd.apache.avro;version=1.9.0",
          payload: {
            schema: {
              type: "record",
              name: "OrderOk",
              namespace: "org.madrid.p001.cmd.orders",
              fields: [{ name: "id", type: "string" }],
            },
          },
        },
      },
    },
    ordersBad: {
      subscribe: {
        operationId: "receiveOrderBad",
        message: {
          schemaFormat: "application/vnd.apache.avro;version=1.9.0",
          payload: {
            schema: {
              type: "record",
              name: "OrderBad",
              namespace: "org.example.bad",
              fields: [{ name: "id", type: "string" }],
            },
          },
        },
      },
    },
  },
};
