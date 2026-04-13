const { linterForRule } = require("../../helpers/utils");
const failBadDescription = require("./AAR036/fail-bad-description");

describe("AAR036: Description format validation", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR036");
  });

  test("Should fail when description starts lowercase or lacks period", async () => {
    const results = await linter.run(failBadDescription);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].code).toBe("asa:AAR036");
  });
});
