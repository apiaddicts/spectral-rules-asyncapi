module.exports = {
  asyncapi: "2.4.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - Fail Scenario" },
  servers: {
    production: {
      url: "broker.example.com:9092",
      protocol: "https",
      description: "Wrong protocol for the Kafka context",
    },
  },
  channels: { "user-events": {} },
};
