module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Avro Namespace Pattern - oneOf (v3)" },
  channels: {
    orders: {
      address: "orders",
      messages: {
        Multi: {
          oneOf: [
            {
              payload: {
                schemaFormat: "application/vnd.apache.avro;version=1.9.0",
                schema: {
                  type: "record",
                  name: "OrderA",
                  namespace: "org.example.a",
                  fields: [{ name: "id", type: "string" }],
                },
              },
            },
          ],
        },
      },
    },
  },
};
