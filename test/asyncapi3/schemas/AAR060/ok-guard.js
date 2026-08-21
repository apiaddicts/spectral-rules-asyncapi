module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - Structural Guards",
  },
  defaultContentType: "application/vnd.apache.avro+avro",
  channels: {
    nullChannel: null,
    scalarChannel: 42,
    noMessages: { address: "x" },
    nullMessages: { address: "y", messages: null },
  },
};
