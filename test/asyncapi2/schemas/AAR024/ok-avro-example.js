module.exports = {
  asyncapi: "2.6.0",
  info: { title: "Content Type - Avro exempt", version: "1.0.0" },
  channels: {
    carga: {
      subscribe: {
        message: {
          schemaFormat: "application/vnd.apache.avro;version=1.9.0",
          payload: {
            type: "record",
            name: "CargaValue",
            namespace: "com.example.avro",
            fields: [{ name: "id", type: "string" }],
          },
        },
      },
    },
  },
};
