module.exports = {
  asyncapi: "3.0.0",
  info: { title: "Orders Service", version: "1.0.0" },
  channels: {
    orders: {
      address: "orders",
      messages: {
        OrderMessage: {
          headers: {
            type: "record",
            name: "HeadersRec",
            namespace: "org.example.headers",
            fields: [{ name: "h", type: "string" }],
          },
          payload: {
            schemaFormat: "application/vnd.apache.avro;version=1.9.0",
            schema: {
              type: "record",
              name: "PayloadRec",
              namespace: "org.example.payload",
              fields: [{ name: "id", type: "string" }],
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      CompSchema: {
        type: "record",
        name: "CompSchemaRec",
        namespace: "org.example.compschema",
        fields: [{ name: "id", type: "string" }],
      },
    },
  },
};
