const msgs = { SomeMessage: { payload: { type: "object" } } };

module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Error Topic Documented" },
  channels: {
    numericChannel: { address: 123, messages: msgs },
    notificacionAlumno: { address: "notificaciones.eventos.alumnos", messages: msgs },
  },
};
