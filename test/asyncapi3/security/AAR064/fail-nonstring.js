module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - Non-string (v3)" },
  servers: {
    numeric: { host: "n:9092", protocol: 123 },
    boolean: { host: "b:9092", protocol: true },
  },
  channels: {
    userEvents: {
      address: "user-events",
      messages: { Event: { payload: { type: "object" } } },
    },
  },
};
