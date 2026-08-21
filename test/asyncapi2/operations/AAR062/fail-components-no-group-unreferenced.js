module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - Unreferenced component channel without group",
  },
  channels: {
    "salida.beca": {
      publish: {
        operationId: "produceSalida",
      },
    },
  },
  components: {
    channels: {
      UnusedChannel: {
        subscribe: {
          operationId: "consumeUnused",
        },
      },
    },
  },
};
