module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - Empty / whitespace (v3)" },
  servers: {
    emptyProto: { host: "e:9092", protocol: "" },
    spacesProto: { host: "s:9092", protocol: "   " },
    paddedProto: { host: "p:9092", protocol: " kafka " },
  },
  channels: {
    userEvents: {
      address: "user-events",
      messages: { Event: { payload: { type: "object" } } },
    },
  },
};
