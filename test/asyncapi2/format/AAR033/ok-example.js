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
              username: { type: "string", minLength: 3, maxLength: 30 },
              email: { type: "string", pattern: "^.+@.+$" },
              role: { type: "string", enum: ["admin", "user"] },
              country: { type: "string", format: "iso-3166" },
              age: { type: "integer", minimum: 0 },
            },
          },
        },
      },
    },
  },
};
