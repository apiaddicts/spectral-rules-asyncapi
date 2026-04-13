module.exports = {
  asyncapi: "2.6.0",
  info: {
    title: "Test API",
    version: "1.0.0",
    description: "Test API for AAR001.",
  },
  servers: {
    production: {
      url: "https://example.com",
      protocol: "https",
      description: "Production server using HTTPS (secure).",
    },
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
