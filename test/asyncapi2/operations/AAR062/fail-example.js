module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - Fail Scenarios",
  },
  channels: {
    "alta.beca": {
      subscribe: { operationId: "consumeAlta" },
    },
    "baja.beca": {
      subscribe: { operationId: "consumeBaja" },
    },
    "salida.beca": {
      publish: { operationId: "produceSalida" },
    },
  },
};
