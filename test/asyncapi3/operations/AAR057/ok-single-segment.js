// A single-segment topic with no consumer group (e.g. orders.error.1) must be valid on the v3
// address path too. Regression test for the {1,20} -> {0,20} quantifier fix.
const msgs = { SomeMessage: { payload: { type: "object" } } };

module.exports = {
  asyncapi: "3.0.0",
  info: { version: "1.0.0", title: "Error Topic Documented" },
  channels: {
    ordersError: { address: "orders.error.1", messages: msgs },
  },
};
