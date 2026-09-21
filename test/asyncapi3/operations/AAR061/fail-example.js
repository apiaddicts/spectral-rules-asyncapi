module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Processor Function Name Paired - Fail Scenarios",
  },
  channels: {
    "a-in": { address: "a.in" },
    "b-out": { address: "b.out" },
  },
  operations: {
    consumeA: {
      action: "receive",
      channel: { $ref: "#/channels/a-in" },
      "x-scs-function-name": "processAtoB",
    },
    produceB: {
      action: "send",
      channel: { $ref: "#/channels/b-out" },
      "x-scs-function-name": "processCtoD",
    },
    pairedIn: {
      action: "receive",
      channel: { $ref: "#/channels/a-in" },
      "x-scs-function-name": "processPaired",
    },
    pairedOut: {
      action: "send",
      channel: { $ref: "#/channels/b-out" },
      "x-scs-function-name": "processPaired",
    },
  },
};
