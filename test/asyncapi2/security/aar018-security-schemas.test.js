const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR018/fail-example");
const okExample = require("./AAR018/ok-example");

describe("AAR018: Security scheme must be among allowed types and complete", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR018");
  });

  test("Should fail when security schemes are invalid or incomplete", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].code).toBe("asa:AAR018");
  });

  test("Should pass when all security schemes are valid and complete", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
