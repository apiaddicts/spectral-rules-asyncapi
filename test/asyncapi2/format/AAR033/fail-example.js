module.exports = {
  asyncapi: "2.6.0",
  info: { version: "1.0.0", title: "String Parameter Integrity" },
  channels: {
    "user/data": {
      publish: {
        message: {
          payload: {
            type: "object",
            properties: {
              username: { type: "string", description: "User name." },
              email: { type: "string", pattern: "^.+@.+$" },
            },
          },
        },
      },
    },
  },
};
