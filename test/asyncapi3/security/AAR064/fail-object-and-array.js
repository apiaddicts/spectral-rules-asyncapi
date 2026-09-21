module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - Object / array protocol (v3)" },
  servers: {
    objProto: { host: "o:9092", protocol: { unexpected: "object" } },
    arrProto: { host: "a:9092", protocol: ["kafka"] },
  },
  channels: {
    userEvents: {
      address: "user-events",
      messages: { Event: { payload: { type: "object" } } },
    },
  },
};
