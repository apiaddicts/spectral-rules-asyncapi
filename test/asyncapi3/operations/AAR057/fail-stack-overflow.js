const msgs = { SomeMessage: { payload: { type: "object" } } };
const longTopic = "aa" + ".aa".repeat(400) + ".error.z";

module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Error Topic Documented" },
  channels: {
    pathologicalChannel: { address: longTopic, messages: msgs },
  },
};
