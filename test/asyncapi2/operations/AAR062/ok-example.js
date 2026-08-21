module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - OK Scenarios",
  },
  channels: {
    "alta.beca": {
      subscribe: {
        operationId: "consumeAlta",
        "x-scs-group": "alta.beca.1",
      },
    },
    "baja.beca": {
      subscribe: {
        operationId: "consumeBaja",
        bindings: {
          kafka: {
            groupId: { type: "string", enum: ["baja.beca.1"] },
          },
        },
      },
    },
    "salida.beca": {
      publish: { operationId: "produceSalida" },
    },
  },
};
