module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Retry Topic Naming Convention - Pass Scenarios"
  },
  "channels": {
    "solicitudBecaRetryGrupo1": {
      "address": "beca.cmd.alumnos.solicitud.beca.grupo1.retry.1",
      "description": "Valid retry channel: topic, consumer group, retry marker and numeric suffix.",
      "messages": {
        "SolicitudBecaMessage": { "payload": { "type": "object" } }
      }
    },
    "solicitudBecaRetryGrupoCanal1": {
      "address": "beca.cmd.alumnos.solicitud.beca.grupo-canal-1.retry.2",
      "description": "Valid retry channel with a hyphenated consumer-group segment.",
      "messages": {
        "SolicitudBecaMessage": { "payload": { "type": "object" } }
      }
    },
    "solicitudBeca": {
      "address": "beca.cmd.alumnos.solicitud.beca",
      "description": "Not a retry channel - must be ignored entirely.",
      "messages": {
        "SolicitudBecaMessage": { "payload": { "type": "object" } }
      }
    },
    "dynamicReplyChannel": {
      "address": null,
      "description": "Null address must be skipped entirely, never flagged.",
      "messages": {
        "ReplyMessage": { "payload": { "type": "object" } }
      }
    }
  }
};
