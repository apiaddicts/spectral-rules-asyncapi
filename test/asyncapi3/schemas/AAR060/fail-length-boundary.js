const mid255 = "x".repeat(255);
const mid256 = "x".repeat(256);

module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - Length Boundary",
  },
  channels: {
    orders: {
      address: "orders",
      messages: {
        atLimit: {
          contentType: `application/${mid255}+avro`,
          payload: { type: "object" },
        },
        overLimit: {
          contentType: `application/${mid256}+avro`,
          payload: { type: "object" },
        },
      },
    },
  },
};
