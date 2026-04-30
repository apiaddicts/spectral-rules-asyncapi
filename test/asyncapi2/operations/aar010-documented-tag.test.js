const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR010/fail-example");
const okExample = require("./AAR010/ok-example");

describe("AAR010: Tags should be documented with a description", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR010");
  });

  test("Should fail when tags lack a description", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].code).toBe("asa:AAR010");
  });

  test("Should pass when all tags have a description", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
