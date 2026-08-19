module.exports = {
  "asyncapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Beca Service"
  },
  "channels": {
    "matchesCustom1": {
      "address": "custom.foo.bar",
      "description": "Matches the custom pattern ^custom\\.[a-z]+\\.[a-z]+$."
    },
    "matchesCustom2": {
      "address": "custom.baz.qux",
      "description": "Matches the custom pattern."
    }
  }
};
