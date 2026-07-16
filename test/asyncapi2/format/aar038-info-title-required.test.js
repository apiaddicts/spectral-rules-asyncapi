const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR038/fail-example");
const okExample = require("./AAR038/ok-example");

describe("AAR038: Info title is required", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR038");
  });

  test("Should fail when info.title is empty", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].code).toBe("asa:AAR038");
  });

  test("Should pass when info.title is present and non-empty", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
