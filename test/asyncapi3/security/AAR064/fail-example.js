module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - Fail Scenario (v3)" },
  servers: {
    production: { host: "broker.example.com", protocol: "wss", pathname: "/ws" },
  },
  channels: {
    userEvents: {
      address: "user-events",
      messages: { Event: { payload: { type: "object" } } },
    },
  },
};
