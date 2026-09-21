
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
    nsMissing: avro({ type: "record", name: "OrderValue", fields: [{ name: "id", type: "string" }] }),
    nsNull: avro({ type: "record", name: "OrderValue", namespace: null, fields: [{ name: "id", type: "string" }] }),
    nsNumber: avro({ type: "record", name: "OrderValue", namespace: 123, fields: [{ name: "id", type: "string" }] }),
    nsBoolean: avro({ type: "record", name: "OrderValue", namespace: true, fields: [{ name: "id", type: "string" }] }),
    nsObject: avro({ type: "record", name: "OrderValue", namespace: { nested: "value" }, fields: [{ name: "id", type: "string" }] }),
    nsArray: avro({ type: "record", name: "OrderValue", namespace: ["org.madrid.p001.core.orders"], fields: [{ name: "id", type: "string" }] }),
    nsSpace: avro({ type: "record", name: "OrderValue", namespace: "org.madrid.p 001.core.orders", fields: [{ name: "id", type: "string" }] }),
    nsDoubleDot: avro({ type: "record", name: "OrderValue", namespace: "org.madrid.p001..orders", fields: [{ name: "id", type: "string" }] }),
    nsUnicode: avro({ type: "record", name: "OrderValue", namespace: "org.madrid.pédro.core.orders", fields: [{ name: "id", type: "string" }] }),
    nsCommonUppercase: avro({ type: "record", name: "OrderValue", namespace: "org.madrid.Common.orders", fields: [{ name: "id", type: "string" }] }),
    nsCommonTypo: avro({ type: "record", name: "OrderValue", namespace: "org.madrid.comon.orders", fields: [{ name: "id", type: "string" }] }),
    nsEnumInvalid: avro({ type: "enum", name: "OrderStatus", namespace: "org.example.orders", symbols: ["NEW", "SHIPPED"] }),
    nsFixedInvalid: avro({ type: "fixed", name: "OrderHash", namespace: "org.example.orders", size: 16 }),
  },
};
