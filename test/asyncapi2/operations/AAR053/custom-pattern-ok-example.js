module.exports = {
  "asyncapi": "2.6.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "custom.foo.bar": {
      "description": "Matches the custom pattern ^custom\\.[a-z]+\\.[a-z]+$.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    },
    "custom.baz.qux": {
      "description": "Matches the custom pattern.",
      "subscribe": { "message": { "payload": { "type": "object" } } }
    }
  }
};
