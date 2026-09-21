module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - $ref to component channel without group",
  },
  channels: {
    "ref-subscribe-nogroup": {
      subscribe: { $ref: "#/components/channels/SharedChannel/subscribe" },
    },
  },
  components: {
    channels: {
      SharedChannel: {
        subscribe: {
          operationId: "consumeNoGroup",
        },
      },
    },
  },
};
