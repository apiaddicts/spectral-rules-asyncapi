module.exports = {
  asyncapi: "2.6.0",
  info: {
    title: "Test API",
    version: "1.0.0",
    description: "lowercase start, no period at end",
  },
  servers: {
    production: {
      url: "https://example.com",
      protocol: "https",
      description: "Production server.",
    },
  },
  channels: {
    "user/signedup": {
      description: "missing period at end",
      subscribe: {
        operationId: "onUserSignup",
        summary: "Receive user signup events.",
        description: "Subscribe to user signup events.",
        tags: [{ name: "users", description: "User-related operations." }],
        message: {
          $ref: "#/components/messages/UserSignedUp",
        },
      },
    },
  },
  components: {
    messages: {
      UserSignedUp: {
        title: "User Signed Up",
        messageId: "userSignedUp",
        payload: {
          type: "object",
          properties: {
            userId: { type: "string", format: "uuid" },
          },
        },
      },
    },
  },
};
