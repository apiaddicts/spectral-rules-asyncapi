module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Retry Topic Naming Convention - Fail Scenarios"
  },
  "channels": {
    "retryNonNumeric": {
      "address": "beca.cmd.alumnos.solicitud.beca.grupo1.retry.abc",
      "description": "Retry suffix is not numeric.",
      "messages": {
        "SolicitudBecaMessage": { "payload": { "type": "object" } }
      }
    },
    "retryUnderscore": {
      "address": "beca_cmd.alumnos.solicitud.beca.grupo1.retry.1",
      "description": "Address contains an underscore.",
      "messages": {
        "SolicitudBecaMessage": { "payload": { "type": "object" } }
      }
    },
    "retryExtraSegment": {
      "address": "beca.cmd.alumnos.solicitud.beca.grupo1.retry.1.extra",
      "description": "Extra trailing segment after the retry number.",
      "messages": {
        "SolicitudBecaMessage": { "payload": { "type": "object" } }
      }
    },
    "retryTooFewSegments": {
      "address": "grupo1.retry.1",
      "description": "Too few segments before '.retry.' - no room for a topic plus consumer group.",
      "messages": {
        "SolicitudBecaMessage": { "payload": { "type": "object" } }
      }
    },
    "retryMissingNumber": {
      "address": "beca.cmd.alumnos.solicitud.beca.grupo1.retry.",
      "description": "Retry marker present but missing the numeric suffix.",
      "messages": {
        "SolicitudBecaMessage": { "payload": { "type": "object" } }
      }
    },
    "notARetryChannel": {
      "address": "beca.cmd.alumnos.solicitud.beca",
      "description": "Not a retry channel at all - must NOT be flagged (decoy).",
      "messages": {
        "SolicitudBecaMessage": { "payload": { "type": "object" } }
      }
    },
    "errorChannel": {
      "address": "beca.cmd.alumnos.solicitud.beca.grupo1.error.1",
      "description": "Error channel, not retry - must NOT be flagged (decoy).",
      "messages": {
        "SolicitudBecaErrorMessage": { "payload": { "type": "object" } }
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
