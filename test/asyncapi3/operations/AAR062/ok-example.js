module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - OK Scenarios",
  },
  channels: {
    "alta-beca": { address: "alta.beca" },
    "baja-beca": { address: "baja.beca" },
    "salida-beca": { address: "salida.beca" },
  },
  operations: {
    consumeAlta: {
      action: "receive",
      channel: { $ref: "#/channels/alta-beca" },
      "x-scs-group": "alta.beca.1",
    },
    consumeBaja: {
      action: "receive",
      channel: { $ref: "#/channels/baja-beca" },
      bindings: {
        kafka: {
          groupId: { type: "string", enum: ["baja.beca.1"] },
        },
      },
    },
    produceSalida: {
      action: "send",
      channel: { $ref: "#/channels/salida-beca" },
    },
  },
};
