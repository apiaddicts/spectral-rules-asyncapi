module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Error Topic Documented - Fail Scenarios"
  },
  "channels": {
    "solicitudBeca": {
      "address": "beca.cmd.alumnos.solicitud.beca",
      "messages": {
        "SolicitudBecaMessage": {
          "payload": { "type": "object" }
        }
      }
    },
    "notificacionAlumno": {
      "address": "notificaciones.eventos.alumnos",
      "messages": {
        "NotificacionAlumnoMessage": {
          "payload": { "type": "object" }
        }
      }
    }
  }
};
