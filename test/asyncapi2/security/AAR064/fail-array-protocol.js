module.exports = {
  asyncapi: "2.4.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - Array protocol" },
  servers: {
    production: { url: "broker.example.com:9092", protocol: ["kafka"] },
  },
  channels: { "user-events": {} },
};
