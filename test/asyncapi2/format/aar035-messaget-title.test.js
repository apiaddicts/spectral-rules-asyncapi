const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR035/fail-example");
const okExample = require("./AAR035/ok-example");

describe("AAR035: Messages should have a title", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR035");
  });

  test("Should fail when messages lack a title", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].code).toBe("asa:AAR035");
  });

  test("Should pass when all messages have a title", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
