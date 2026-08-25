module.exports = {
  asyncapi: "2.4.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - $ref server" },
  servers: {
    production: { $ref: "#/components/servers/insecure" },
  },
  channels: { "user-events": {} },
  components: {
    servers: {
      insecure: { url: "broker.example.com:9092", protocol: "https" },
    },
  },
};
