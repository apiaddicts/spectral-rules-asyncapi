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
              temperature: { type: "number", minimum: -50, maximum: 150 },
              level: { type: "integer", enum: [1, 2, 3] },
              pressure: { type: "integer", format: "int32" },
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
          sensorId: { type: "integer", const: 7 },
          label: { type: "string" },
        },
      },
    },
  },
};
