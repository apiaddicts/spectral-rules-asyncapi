module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - No servers (v3)" },
  channels: {
    userEvents: {
      address: "user-events",
      messages: { Event: { payload: { type: "object" } } },
    },
  },
};
