module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Retry Topic Naming Convention - Pass Scenarios"
  },
  "channels": {
    "beca.cmd.alumnos.solicitud.beca.grupo1.retry.1": {
      "description": "Valid retry channel: topic, consumer group, retry marker and numeric suffix.",
      "subscribe": {
        "operationId": "receiveSolicitudBecaRetryGrupo1",
        "message": { "payload": { "type": "object" } }
      }
    },
    "beca.cmd.alumnos.solicitud.beca.grupo-canal-1.retry.2": {
      "description": "Valid retry channel with a hyphenated consumer-group segment.",
      "subscribe": {
        "operationId": "receiveSolicitudBecaRetryGrupoCanal1",
        "message": { "payload": { "type": "object" } }
      }
    },
    "beca.cmd.alumnos.solicitud.beca": {
      "description": "Not a retry channel - must be ignored entirely.",
      "subscribe": {
        "operationId": "receiveSolicitudBeca",
        "message": { "payload": { "type": "object" } }
      }
    }
  }
};
