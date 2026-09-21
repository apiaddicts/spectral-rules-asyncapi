module.exports = {
  asyncapi: "2.4.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - valid $ref server" },
  servers: {
    production: { $ref: "#/components/servers/secure" },
  },
  channels: { "user-events": {} },
  components: {
    servers: {
      secure: { url: "broker.example.com:9092", protocol: "kafka-ssl" },
    },
  },
};
