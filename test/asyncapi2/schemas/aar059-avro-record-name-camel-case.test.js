const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR059/fail-example");
const okExample = require("./AAR059/ok-example");

describe("AAR059: Avro record names must be in CamelCase (AsyncAPI 2.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR059");
  });

  test("Should report one violation per non-CamelCase Avro record name, including nested/union/array/map records, and not double-count a record shared via $ref", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(8);
    results.forEach((r) => expect(r.code).toBe("asa:AAR059"));
  });

  test("Should pass for CamelCase record names at every nesting level", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
