module.exports = {
  asyncapi: "2.4.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - Skip cases" },
  servers: {
    nullServer: null,
    scalarServer: "just-a-string",
    missingProtocol: { url: "m:9092", description: "No protocol field at all" },
    nullProtocol: { url: "n:9092", protocol: null },
    validServer: { url: "v:9092", protocol: "kafka" },
  },
  channels: { "user-events": {} },
};
