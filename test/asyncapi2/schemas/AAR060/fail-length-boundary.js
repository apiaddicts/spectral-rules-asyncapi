const mid255 = "x".repeat(255);
const mid256 = "x".repeat(256);

module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - Length Boundary",
  },
  channels: {
    atLimit: {
      subscribe: {
        message: {
          contentType: `application/${mid255}+avro`,
          payload: { type: "object" },
        },
      },
    },
    overLimit: {
      subscribe: {
        message: {
          contentType: `application/${mid256}+avro`,
          payload: { type: "object" },
        },
      },
    },
  },
};
