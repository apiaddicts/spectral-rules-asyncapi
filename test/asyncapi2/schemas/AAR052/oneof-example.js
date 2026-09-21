module.exports = {
  asyncapi: "2.6.0",
  info: { version: "1.0.0", title: "Avro Namespace Pattern - oneOf" },
  channels: {
    orders: {
      subscribe: {
        operationId: "receiveOrder",
        message: {
          oneOf: [
            {
              schemaFormat: "application/vnd.apache.avro;version=1.9.0",
              payload: {
                type: "record",
                name: "OrderA",
                namespace: "org.example.a",
                fields: [{ name: "id", type: "string" }],
              },
            },
            {
              schemaFormat: "application/vnd.apache.avro;version=1.9.0",
              payload: {
                type: "record",
                name: "OrderB",
                namespace: "org.madrid.p001.cmd.orders",
                fields: [{ name: "id", type: "string" }],
              },
            },
          ],
        },
      },
    },
  },
};
