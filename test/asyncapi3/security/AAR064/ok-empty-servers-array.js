module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - Empty servers array (v3)" },
  servers: [],
  channels: {
    userEvents: {
      address: "user-events",
      messages: { Event: { payload: { type: "object" } } },
    },
  },
};
