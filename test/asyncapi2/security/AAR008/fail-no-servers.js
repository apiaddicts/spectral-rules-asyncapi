module.exports = {
  asyncapi: "2.6.0",
  info: {
    title: "Test API",
    version: "1.0.0",
    description: "Test API without servers.",
  },
  channels: {
    "user/signedup": {
      description: "Channel for user signup events.",
      subscribe: {
        operationId: "onUserSignup",
        summary: "Receive user signup events.",
        description: "Subscribe to user signup events.",
        tags: [{ name: "users", description: "User-related operations." }],
        message: {
          payload: {
            type: "object",
            properties: {
              userId: { type: "string", format: "uuid" },
            },
          },
        },
      },
    },
  },
};
