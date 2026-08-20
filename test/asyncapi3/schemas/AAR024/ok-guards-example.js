module.exports = {
  asyncapi: "3.0.0",
  info: { title: "Content Type - Guards pass", version: "1.0.0" },
  channels: {
    nullChannel: null,
    scalarChannel: "not-an-object",
    emptyString: {
      address: "emptyString",
      messages: { M1: { contentType: "", payload: { type: "object" } } },
    },
    objectValue: {
      address: "objectValue",
      messages: { M2: { contentType: { a: 1 }, payload: { type: "object" } } },
    },
    avroMessageLevel: {
      address: "avroMessageLevel",
      messages: {
        M3: {
          schemaFormat: "application/vnd.apache.avro;version=1.9.0",
          payload: { type: "record", name: "R", fields: [] },
        },
      },
    },
    avroPayloadLevel: {
      address: "avroPayloadLevel",
      messages: {
        M4: {
          payload: {
            schemaFormat: "application/vnd.apache.avro;version=1.9.0",
            schema: { type: "record", name: "R2", fields: [] },
          },
        },
      },
    },
    channelWithoutMessages: {
      address: "channelWithoutMessages",
    },
  },
  components: {},
};
