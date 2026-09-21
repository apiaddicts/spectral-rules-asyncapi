module.exports = {
  asyncapi: "2.4.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - Numeric / boolean" },
  servers: {
    intProto: { url: "i:9092", protocol: 9092 },
    floatProto: { url: "f:9092", protocol: 1.5 },
    boolFalse: { url: "b:9092", protocol: false },
  },
  channels: { "user-events": {} },
};
