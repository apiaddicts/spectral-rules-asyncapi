const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR052/fail-example");
const okExample = require("./AAR052/ok-example");
const edgeExample = require("./AAR052/edge-example");
const mixedExample = require("./AAR052/mixed-example");
const locationsExample = require("./AAR052/locations-example");

describe("AAR052: Avro namespace must follow the corporate pattern", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR052");
  });

  test("Should report exactly one violation each for a wrong-domain, an empty-string, a $ref-resolved and a wrapped (payload.schema) namespace (no duplicates)", async () => {
    const results = await linter.run(failExample);
    const paths = results.map((r) => r.path.join(".")).sort();

    expect(paths).toEqual([
      "channels.ordersEmptyNamespace.subscribe.message.payload",
      "channels.ordersWrapped.subscribe.message.payload.schema",
      "channels.ordersWrongDomain.subscribe.message.payload",
      "components.messages.OrderMessage.payload",
    ]);
    results.forEach((r) => expect(r.code).toBe("asa:AAR052"));
  });

  test("Should pass for a valid application-schema, a valid common-schema, a valid wrapped (payload.schema) namespace, and a non-Avro JSON Schema payload", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });

  test("Should respect a custom pattern override instead of the default corporate pattern", async () => {
    const customLinter = await linterForRule("asa:AAR052", {
      functionOptions: { pattern: "^custom\\.[a-z]+$" },
    });

    const results = await customLinter.run(okExample);
    const paths = results.map((r) => r.path.join(".")).sort();

    expect(paths).toEqual([
      "channels.ordersApp.subscribe.message.payload",
      "channels.ordersCommon.subscribe.message.payload",
      "channels.ordersEnumValid.subscribe.message.payload",
      "channels.ordersFixedValid.subscribe.message.payload",
      "channels.ordersWrapped.subscribe.message.payload.schema",
    ]);
    results.forEach((r) => expect(r.code).toBe("asa:AAR052"));
  });

  test("Should flag every untested branch: missing, null, non-string, special chars, misspelled common, and enum/fixed types", async () => {
    const results = await linter.run(edgeExample);
    const paths = results.map((r) => r.path.join(".")).sort();

    expect(paths).toEqual([
      "channels.nsArray.subscribe.message.payload",
      "channels.nsBoolean.subscribe.message.payload",
      "channels.nsCommonTypo.subscribe.message.payload",
      "channels.nsCommonUppercase.subscribe.message.payload",
      "channels.nsDoubleDot.subscribe.message.payload",
      "channels.nsEnumInvalid.subscribe.message.payload",
      "channels.nsFixedInvalid.subscribe.message.payload",
      "channels.nsMissing.subscribe.message.payload",
      "channels.nsNull.subscribe.message.payload",
      "channels.nsNumber.subscribe.message.payload",
      "channels.nsObject.subscribe.message.payload",
      "channels.nsSpace.subscribe.message.payload",
      "channels.nsUnicode.subscribe.message.payload",
    ]);
    results.forEach((r) => expect(r.code).toBe("asa:AAR052"));
  });

  test("Should flag only the invalid schemas in a document mixing valid and invalid Avro records/enum/fixed", async () => {
    const results = await linter.run(mixedExample);
    const paths = results.map((r) => r.path.join(".")).sort();

    expect(paths).toEqual([
      "channels.invalidDomain.subscribe.message.payload",
      "channels.invalidFixed.subscribe.message.payload",
    ]);
    results.forEach((r) => expect(r.code).toBe("asa:AAR052"));
  });

  test("Should validate Avro namespaces beyond payloads: message headers, channel parameter schemas, and component schemas", async () => {
    const results = await linter.run(locationsExample);
    const paths = results.map((r) => r.path.join(".")).sort();

    expect(paths).toEqual([
      "channels.orders.parameters.orderId.schema",
      "channels.orders.subscribe.message.headers",
      "channels.orders.subscribe.message.payload",
      "components.schemas.CompSchema",
    ]);
    results.forEach((r) => expect(r.code).toBe("asa:AAR052"));
  });
});
