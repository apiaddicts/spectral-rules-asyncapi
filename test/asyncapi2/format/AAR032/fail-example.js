module.exports = {
  asyncapi: "2.6.0",
  info: { version: "1.0.0", title: "Numeric Parameter Integrity" },
  channels: {
    "sensor/data": {
      publish: {
        message: {
          payload: {
            type: "object",
            properties: {
              temperature: { type: "number", description: "Measured temperature." },
              humidity: { type: "number", minimum: 0, maximum: 100 },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Reading: {
        type: "object",
        properties: {
          sensorId: { type: "integer", description: "Sensor id." },
        },
      },
    },
  },
};
