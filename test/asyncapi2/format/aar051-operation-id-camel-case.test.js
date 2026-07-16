const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR051/fail-example");
const okExample = require("./AAR051/ok-example");

describe("AAR051: operationId must be present and in camelCase", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR051");
  });

  test("Should fail when operationId is missing, empty, snake_case or PascalCase", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].code).toBe("asa:AAR051");
  });

  test("Should pass when operationId is present and in camelCase", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
