module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - Empty x-scs-group",
  },
  channels: {
    "empty.beca": {
      subscribe: {
        operationId: "consumeEmpty",
        "x-scs-group": "",
      },
    },
    "whitespace.beca": {
      subscribe: {
        operationId: "consumeWhitespace",
        "x-scs-group": "   ",
      },
    },
  },
};
