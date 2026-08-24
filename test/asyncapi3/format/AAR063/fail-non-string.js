module.exports = {
  asyncapi: 3.0,
  info: {
    version: "1.0.0",
    title: "AsyncAPI Version Allowed - Non-string Version",
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
