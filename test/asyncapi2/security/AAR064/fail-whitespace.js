module.exports = {
  asyncapi: "2.4.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - Whitespace" },
  servers: {
    onlySpaces: { url: "s:9092", protocol: "   " },
    padded: { url: "p:9092", protocol: " kafka " },
  },
  channels: { "user-events": {} },
};
