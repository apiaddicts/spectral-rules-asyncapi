const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR052/fail-example");
const okExample = require("./AAR052/ok-example");

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
      "channels.ordersWrapped.subscribe.message.payload.schema",
    ]);
    results.forEach((r) => expect(r.code).toBe("asa:AAR052"));
  });
});
