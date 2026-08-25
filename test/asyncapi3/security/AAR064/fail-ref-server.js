module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - $ref server (v3)" },
  servers: {
    production: { $ref: "#/components/servers/insecure" },
  },
  channels: {
    userEvents: {
      address: "user-events",
      messages: { Event: { payload: { type: "object" } } },
    },
  },
  components: {
    servers: {
      insecure: { host: "broker.example.com:9092", protocol: "https" },
    },
  },
};
