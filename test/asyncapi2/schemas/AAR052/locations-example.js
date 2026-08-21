module.exports = {
  asyncapi: "2.6.0",
  info: { version: "1.0.0", title: "Orders Service" },
  channels: {
    orders: {
      parameters: {
        orderId: {
          schema: {
            type: "record",
            name: "ParamRec",
            namespace: "org.example.param",
            fields: [{ name: "id", type: "string" }],
          },
        },
      },
      subscribe: {
        operationId: "receiveOrder",
        message: {
          schemaFormat: "application/vnd.apache.avro;version=1.9.0",
          headers: {
            type: "record",
            name: "HeadersRec",
            namespace: "org.example.headers",
            fields: [{ name: "h", type: "string" }],
          },
          payload: {
            type: "record",
            name: "PayloadRec",
            namespace: "org.example.payload",
            fields: [{ name: "id", type: "string" }],
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
