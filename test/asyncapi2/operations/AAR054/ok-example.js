module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "beca.cdc.alumnos.registro-bonificacion.beca": {
      "description": "Change Data Capture topic.",
      "subscribe": {
        "message": {
          "payload": {
            "type": "object",
            "properties": { "id": { "type": "string" } }
          }
        }
      }
    },
    "beca.cmd.alumnos.registro-bonificacion.beca": {
      "description": "Command topic that triggers a domain modification.",
      "subscribe": {
        "message": {
          "payload": {
            "type": "object",
            "properties": { "id": { "type": "string" } }
          }
        }
      }
    },
    "beca.sys.alumnos.registro-bonificacion.beca": {
      "description": "Internal system topic.",
      "subscribe": {
        "message": {
          "payload": {
            "type": "object",
            "properties": { "id": { "type": "string" } }
          }
        }
      }
    }
  }
};
