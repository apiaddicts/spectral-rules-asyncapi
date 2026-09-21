module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - $ref to component operation without group",
  },
  channels: {
    "alta-beca": { address: "alta.beca" },
  },
  operations: {
    refOperationNoGroup: { $ref: "#/components/operations/sharedConsumerNoGroup" },
  },
  components: {
    operations: {
      sharedConsumerNoGroup: {
        action: "receive",
        channel: { $ref: "#/channels/alta-beca" },
      },
    },
  },
};
