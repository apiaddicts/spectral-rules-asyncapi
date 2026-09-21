module.exports = {
  asyncapi: "2.4.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - Wrong case" },
  servers: {
    upper: { url: "u:9092", protocol: "KAFKA" },
    mixedSsl: { url: "m:9092", protocol: "Kafka-SSL" },
    weird: { url: "w:9092", protocol: "kAfKa" },
  },
  channels: { "user-events": {} },
};
