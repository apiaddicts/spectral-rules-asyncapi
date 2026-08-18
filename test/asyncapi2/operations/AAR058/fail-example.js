module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Retry Topic Naming Convention - Fail Scenarios"
  },
  "channels": {
    "beca.cmd.alumnos.solicitud.beca.grupo1.retry.abc": {
      "description": "Retry suffix is not numeric.",
      "subscribe": {
        "operationId": "receiveSolicitudBecaRetryNonNumeric",
        "message": { "payload": { "type": "object" } }
      }
    },
    "beca_cmd.alumnos.solicitud.beca.grupo1.retry.1": {
      "description": "Channel name contains an underscore.",
      "subscribe": {
        "operationId": "receiveSolicitudBecaRetryUnderscore",
        "message": { "payload": { "type": "object" } }
      }
    },
    "beca.cmd.alumnos.solicitud.beca.grupo1.retry.1.extra": {
      "description": "Extra trailing segment after the retry number.",
      "subscribe": {
        "operationId": "receiveSolicitudBecaRetryExtraSegment",
        "message": { "payload": { "type": "object" } }
      }
    },
    "grupo1.retry.1": {
      "description": "Too few segments before '.retry.' - no room for a topic plus consumer group.",
      "subscribe": {
        "operationId": "receiveSolicitudBecaRetryTooFewSegments",
        "message": { "payload": { "type": "object" } }
      }
    },
    "beca.cmd.alumnos.solicitud.beca.grupo1.retry.": {
      "description": "Retry marker present but missing the numeric suffix.",
      "subscribe": {
        "operationId": "receiveSolicitudBecaRetryMissingNumber",
        "message": { "payload": { "type": "object" } }
      }
    },
    "beca.cmd.alumnos.solicitud.beca": {
      "description": "Not a retry channel at all - must NOT be flagged (decoy).",
      "subscribe": {
        "operationId": "receiveSolicitudBeca",
        "message": { "payload": { "type": "object" } }
      }
    },
    "beca.cmd.alumnos.solicitud.beca.grupo1.error.1": {
      "description": "Error channel, not retry - must NOT be flagged (decoy).",
      "publish": {
        "operationId": "publishSolicitudBecaErrorGrupo1",
        "message": { "payload": { "type": "object" } }
      }
    }
  }
};
