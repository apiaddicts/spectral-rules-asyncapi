module.exports = {
  asyncapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Subscribe Group Required - Fail Scenarios",
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
    },
    consumeBaja: {
      action: "receive",
      channel: { $ref: "#/channels/baja-beca" },
    },
    produceSalida: {
      action: "send",
      channel: { $ref: "#/channels/salida-beca" },
    },
  },
};
