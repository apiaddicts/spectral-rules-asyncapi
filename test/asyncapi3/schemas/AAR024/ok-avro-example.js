module.exports = {
  asyncapi: "3.0.0",
  info: { title: "Content Type - Avro exempt", version: "1.0.0" },
  channels: {
    carga: {
      address: "carga",
      messages: {
        CargaMessage: {
          payload: {
            schemaFormat: "application/vnd.apache.avro;version=1.9.0",
            schema: {
              type: "record",
              name: "CargaValue",
              namespace: "com.example.avro",
              fields: [{ name: "id", type: "string" }],
            },
          },
        },
      },
    },
  },
};
