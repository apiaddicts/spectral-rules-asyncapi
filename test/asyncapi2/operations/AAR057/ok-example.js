module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Error Topic Documented - Pass Scenarios"
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
    "beca.cmd.alumnos.solicitud.beca.grupo1.error.1": {
      "publish": {
        "operationId": "publishSolicitudBecaErrorGrupo1",
        "message": {
          "payload": { "type": "object" }
        }
      }
    }
  }
};
