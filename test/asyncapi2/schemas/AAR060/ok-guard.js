module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Content Type Avro - Structural Guards",
  },
  defaultContentType: "application/vnd.apache.avro+avro",
  channels: {
    nullChannel: null,
    scalarChannel: 42,
    noOperations: {},
    nullPublish: { publish: null },
  },
};
