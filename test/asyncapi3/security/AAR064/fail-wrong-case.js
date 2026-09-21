module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - Wrong case (v3)" },
  servers: {
    upper: { host: "u:9092", protocol: "KAFKA" },
    mixedSsl: { host: "m:9092", protocol: "Kafka-SSL" },
  },
  channels: {
    userEvents: {
      address: "user-events",
      messages: { Event: { payload: { type: "object" } } },
    },
  },
};
