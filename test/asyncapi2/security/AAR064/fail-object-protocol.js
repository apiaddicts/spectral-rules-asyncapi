module.exports = {
  asyncapi: "2.4.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - Object protocol" },
  servers: {
    production: { url: "broker.example.com:9092", protocol: { unexpected: "object" } },
  },
  channels: { "user-events": {} },
};
