module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - Skip cases (v3)" },
  servers: {
    nullServer: null,
    scalarServer: "just-a-string",
    missingProtocol: { host: "m:9092", description: "No protocol field at all" },
    nullProtocol: { host: "n:9092", protocol: null },
    validServer: { host: "v:9092", protocol: "kafka-ssl" },
  },
  channels: {
    userEvents: {
      address: "user-events",
      messages: { Event: { payload: { type: "object" } } },
    },
  },
};
