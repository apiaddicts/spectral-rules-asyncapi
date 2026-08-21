module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - Array-form servers (v3)" },
  servers: [
    { host: "g:9092", protocol: "kafka" },
    { host: "b:9092", protocol: "https" },
    { host: "g2:9092", protocol: "kafka-ssl" },
  ],
  channels: {
    userEvents: {
      address: "user-events",
      messages: { Event: { payload: { type: "object" } } },
    },
  },
};
