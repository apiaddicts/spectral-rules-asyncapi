module.exports = {
  asyncapi: "2.6.0",
  info: { title: "Content Type - Guards pass", version: "1.0.0" },
  channels: {
    nullChannel: null,
    scalarChannel: "not-an-object",
    emptyString: {
      subscribe: {
        message: { contentType: "", payload: { type: "object" } },
      },
    },
    objectValue: {
      publish: {
        message: { contentType: { a: 1 }, payload: { type: "object" } },
      },
    },
    nullMessage: {
      subscribe: { message: null },
    },
    operationWithoutMessage: {
      subscribe: { operationId: "noMessage" },
    },
    avro: {
      subscribe: {
        message: {
          schemaFormat: "application/vnd.apache.avro;version=1.9.0",
          payload: { type: "record", name: "R", fields: [] },
        },
      },
    },
    referenceSite: { $ref: "#/components/channels/orders" },
    emptyOneOf: { subscribe: { message: { oneOf: [] } } },
    oneOfNotAnArray: {
      subscribe: {
        message: {
          contentType: "application/json",
          oneOf: { first: { payload: { type: "object" } } },
        },
      },
    },
  },
  components: {
    channels: null,
    messages: null,
  },
};
