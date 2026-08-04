const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR060/fail-example");
const okExample = require("./AAR060/ok-example");

describe("AAR060: contentType must be application/*+avro (AsyncAPI 2.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR060");
  });

  test("Should report one violation per non-avro contentType (inline message, oneOf member, component message) plus the defaultContentType", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(4);
    results.forEach((r) => expect(r.code).toBe("asa:AAR060"));
  });

  test("Should pass when every declared contentType matches application/*+avro and messages without contentType are ignored", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
