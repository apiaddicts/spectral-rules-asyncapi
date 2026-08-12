const avro = (payload) => ({
  messages: {
    OrderValue: {
      schemaFormat: "application/vnd.apache.avro;version=1.9.0",
      payload,
    },
  },
});

module.exports = {
  asyncapi: "3.0.0",
  info: { title: "Orders Service", version: "1.0.0" },
  channels: {
    validApp: avro({ type: "record", name: "OrderValue", namespace: "org.madrid.p001.core.orders", fields: [{ name: "id", type: "string" }] }),
    invalidDomain: avro({ type: "record", name: "OrderValue", namespace: "org.example.orders", fields: [{ name: "id", type: "string" }] }),
    validEnumCommon: avro({ type: "enum", name: "OrderStatus", namespace: "org.madrid.common.orders", symbols: ["NEW", "SHIPPED"] }),
    invalidFixed: avro({ type: "fixed", name: "OrderHash", namespace: "org.example.hash", size: 16 }),
  },
};
