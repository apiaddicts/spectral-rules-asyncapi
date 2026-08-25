module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Error Topic Documented - Fail Scenarios"
  },
  "channels": {
    "beca.cmd.alumnos.solicitud.beca": {
      "subscribe": {
        "operationId": "receiveSolicitudBeca",
        "message": {
          "payload": { "type": "object" }
        }
      }
    },
    "notificaciones.eventos.alumnos": {
      "publish": {
        "operationId": "publishNotificacionAlumno",
        "message": {
          "payload": { "type": "object" }
        }
      }
    }
  }
};
