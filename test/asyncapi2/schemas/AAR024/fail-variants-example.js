module.exports = {
  asyncapi: "2.6.0",
  info: { title: "Content Type - Fail variants", version: "1.0.0" },
  channels: {
    empty: { subscribe: { message: {} } },
    nullCt: { subscribe: { message: { contentType: null, payload: { type: "object" } } } },
    nonAvro: {
      subscribe: {
        message: {
          schemaFormat: "application/schema+json;version=draft-07",
          payload: { type: "object" },
        },
      },
    },
    headersOnly: {
      subscribe: {
        message: { headers: { type: "object" }, payload: { type: "object" } },
      },
    },
  },
};
