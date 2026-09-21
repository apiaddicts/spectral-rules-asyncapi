module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "scholarshipValid": {
      "address": "beca.cmd.alumnos.registro-bonificacion.beca",
      "description": "Valid address."
    },
    "scholarshipInvalidUnderscore": {
      "address": "beca_cmd.alumnos.registro-bonificacion.beca",
      "description": "Invalid address (underscore); flagged on the address node."
    },
    "beca.cmd.alumnos.consulta-saldo.beca": {
      "description": "No 'address' field; valid channel key, not flagged."
    },
    "pago_cmd.alumnos.registro-bonificacion.beca": {
      "description": "No 'address' field; invalid channel key (underscore), flagged on the key."
    }
  }
};
