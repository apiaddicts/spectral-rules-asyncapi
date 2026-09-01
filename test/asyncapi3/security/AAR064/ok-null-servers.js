module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - Null servers (v3)" },
  servers: null,
  channels: {
    userEvents: {
      address: "user-events",
      messages: { Event: { payload: { type: "object" } } },
    },
  },
};
