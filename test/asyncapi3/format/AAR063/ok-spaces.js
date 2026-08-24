module.exports = {
  asyncapi: " 3.0.0 ",
  info: {
    version: "1.0.0",
    title: "AsyncAPI Version Allowed - Whitespace-padded Version",
  },
  channels: {
    events: {
      address: "events",
      messages: {
        Event: { payload: { type: "object" } },
      },
    },
  },
};
