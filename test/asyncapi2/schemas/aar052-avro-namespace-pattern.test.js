const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR052/fail-example");
const okExample = require("./AAR052/ok-example");

describe("AAR052: Avro namespace must follow the corporate pattern", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR052");
  });

  test("Should report exactly one violation each for a wrong-domain, an empty-string, and a $ref-resolved namespace (no duplicates)", async () => {
    const results = await linter.run(failExample);
    const paths = results.map((r) => r.path.join(".")).sort();

    expect(paths).toEqual([
      "channels.ordersEmptyNamespace.subscribe.message.payload",
      "channels.ordersWrongDomain.subscribe.message.payload",
      "components.messages.OrderMessage.payload",
    ]);
    results.forEach((r) => expect(r.code).toBe("asa:AAR052"));
  });

  test("Should pass for both a valid application-schema and a valid common-schema namespace", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
