const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR052/fail-example");
const okExample = require("./AAR052/ok-example");

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
});
