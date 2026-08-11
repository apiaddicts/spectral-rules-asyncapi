const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR052/fail-example");
const okExample = require("./AAR052/ok-example");
const edgeExample = require("./AAR052/edge-example");
const mixedExample = require("./AAR052/mixed-example");
const locationsExample = require("./AAR052/locations-example");

describe("AAR052 (AsyncAPI 3.x): Avro namespace must follow the corporate pattern", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR052");
  });

  test("Should report exactly one violation each for a wrong-domain and an empty-string namespace, plus the $ref-resolved components message (no duplicates)", async () => {
    const results = await linter.run(failExample);
    const paths = results.map((r) => r.path.join(".")).sort();

    expect(paths).toEqual([
      "channels.ordersEmptyNamespace.messages.OrderValue.payload",
      "channels.ordersWrongDomain.messages.OrderValue.payload",
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
      "channels.ordersApp.messages.OrderValue.payload",
      "channels.ordersCommon.messages.OrderValue.payload",
      "channels.ordersEnumValid.messages.OrderValue.payload",
      "channels.ordersFixedValid.messages.OrderValue.payload",
      "channels.ordersWrapped.messages.OrderValue.payload.schema",
    ]);
    results.forEach((r) => expect(r.code).toBe("asa:AAR052"));
  });

  test("Should flag every untested branch: missing, null, non-string, special chars, misspelled common, and enum/fixed types", async () => {
    const results = await linter.run(edgeExample);
    const paths = results.map((r) => r.path.join(".")).sort();

    expect(paths).toEqual([
      "channels.nsArray.messages.OrderValue.payload",
      "channels.nsBoolean.messages.OrderValue.payload",
      "channels.nsCommonTypo.messages.OrderValue.payload",
      "channels.nsCommonUppercase.messages.OrderValue.payload",
      "channels.nsDoubleDot.messages.OrderValue.payload",
      "channels.nsEnumInvalid.messages.OrderValue.payload",
      "channels.nsFixedInvalid.messages.OrderValue.payload",
      "channels.nsMissing.messages.OrderValue.payload",
      "channels.nsNull.messages.OrderValue.payload",
      "channels.nsNumber.messages.OrderValue.payload",
      "channels.nsObject.messages.OrderValue.payload",
      "channels.nsSpace.messages.OrderValue.payload",
      "channels.nsUnicode.messages.OrderValue.payload",
    ]);
    results.forEach((r) => expect(r.code).toBe("asa:AAR052"));
  });

  test("Should flag only the invalid schemas in a document mixing valid and invalid Avro records/enum/fixed", async () => {
    const results = await linter.run(mixedExample);
    const paths = results.map((r) => r.path.join(".")).sort();

    expect(paths).toEqual([
      "channels.invalidDomain.messages.OrderValue.payload",
      "channels.invalidFixed.messages.OrderValue.payload",
    ]);
    results.forEach((r) => expect(r.code).toBe("asa:AAR052"));
  });

  test("Should validate Avro namespaces beyond payloads: message headers and component schemas", async () => {
    const results = await linter.run(locationsExample);
    const paths = results.map((r) => r.path.join(".")).sort();

    expect(paths).toEqual([
      "channels.orders.messages.OrderMessage.headers",
      "channels.orders.messages.OrderMessage.payload.schema",
      "components.schemas.CompSchema",
    ]);
    results.forEach((r) => expect(r.code).toBe("asa:AAR052"));
  });
});
