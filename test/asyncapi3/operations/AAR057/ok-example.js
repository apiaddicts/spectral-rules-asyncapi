module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Error Topic Documented - Pass Scenarios"
  },
  "channels": {
    "dynamicReplyChannel": {
      "address": null,
      "messages": {
        "ReplyMessage": {
          "payload": { "type": "object" }
        }
      }
    },
    "solicitudBeca": {
      "address": "beca.cmd.alumnos.solicitud.beca",
      "messages": {
        "SolicitudBecaMessage": {
          "payload": { "type": "object" }
        }
      }
    },
    "solicitudBecaErrorGrupo1": {
      "address": "beca.cmd.alumnos.solicitud.beca.grupo1.error.1",
      "messages": {
        "SolicitudBecaErrorMessage": {
          "payload": { "type": "object" }
        }
      }
    }
  }
};
