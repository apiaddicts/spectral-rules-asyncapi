const { linterForRule } = require("../../helpers/utils");
const failNoTags = require("./AAR009/fail-no-tags");
const okWithTags = require("./AAR009/ok-with-tags");

describe("AAR009: Operations must declare tags", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR009");
  });

  test("Should fail when operation has no tags", async () => {
    const results = await linter.run(failNoTags);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].code).toBe("asa:AAR009");
  });

  test("Should pass when operation has tags", async () => {
    const results = await linter.run(okWithTags);
    expect(results.length).toBe(0);
  });
});
