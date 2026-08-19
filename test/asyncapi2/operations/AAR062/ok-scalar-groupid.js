module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - Scalar kafka groupId is accepted",
  },
  channels: {
    "scalar.beca": {
      subscribe: {
        operationId: "consumeScalar",
        bindings: {
          kafka: {
            groupId: "scalar.beca.1",
          },
        },
      },
    },
  },
};
