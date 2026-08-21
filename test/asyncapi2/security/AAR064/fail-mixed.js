module.exports = {
  asyncapi: "2.4.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - Mixed servers" },
  servers: {
    good1: { url: "g1:9092", protocol: "kafka" },
    bad1: { url: "b1:9092", protocol: "https" },
    good2: { url: "g2:9092", protocol: "kafka-ssl" },
    bad2: { url: "b2:9092", protocol: "mqtt" },
  },
  channels: { "user-events": {} },
};
