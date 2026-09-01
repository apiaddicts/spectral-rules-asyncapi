module.exports = {
  asyncapi: "2.4.0",
  info: { version: "1.0.0", title: "Kafka Protocol Required - Empty object / array protocol" },
  servers: {
    emptyObj: { url: "o:9092", protocol: {} },
    emptyArr: { url: "a:9092", protocol: [] },
  },
  channels: { "user-events": {} },
};
