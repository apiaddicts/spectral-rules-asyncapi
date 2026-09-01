module.exports = {
  asyncapi: "3.0.0",
  info: { title: "Content Type - Fail variants", version: "1.0.0" },
  channels: {
    empty: { address: "empty", messages: { M1: {} } },
    nullCt: {
      address: "nullCt",
      messages: { M2: { contentType: null, payload: { type: "object" } } },
    },
    nonAvro: {
      address: "nonAvro",
      messages: {
        M3: {
          payload: {
            schemaFormat: "application/schema+json;version=draft-07",
            schema: { type: "object" },
          },
        },
      },
    },
    messageOneOf: {
      address: "messageOneOf",
      messages: {
        M4: { oneOf: [{ payload: { type: "object" } }, { payload: { type: "object" } }] },
      },
    },
  },
};
