const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR021/fail-example");
const okExample = require("./AAR021/ok-example");

describe("AAR021: Operations must provide a summary", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR021");
  });

  test("Should fail when an operation lacks a summary", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].code).toBe("asa:AAR021");
  });

  test("Should pass when all operations have a summary", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
