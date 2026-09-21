const avro = (payload) => ({
  subscribe: {
    operationId: "receive",
    message: {
      schemaFormat: "application/vnd.apache.avro;version=1.9.0",
      payload,
    },
  },
});

module.exports = {
  asyncapi: "2.6.0",
  info: { version: "1.0.0", title: "Orders Service" },
  channels: {
    validApp: avro({ type: "record", name: "OrderValue", namespace: "org.madrid.p001.core.orders", fields: [{ name: "id", type: "string" }] }),
    invalidDomain: avro({ type: "record", name: "OrderValue", namespace: "org.example.orders", fields: [{ name: "id", type: "string" }] }),
    validEnumCommon: avro({ type: "enum", name: "OrderStatus", namespace: "org.madrid.common.orders", symbols: ["NEW", "SHIPPED"] }),
    invalidFixed: avro({ type: "fixed", name: "OrderHash", namespace: "org.example.hash", size: 16 }),
  },
};
