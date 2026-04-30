const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR029/fail-example");
const okExample = require("./AAR029/ok-example");

describe("AAR029: Channels and operations must have a description", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR029");
  });

  test("Should fail when channels or operations lack a description", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].code).toBe("asa:AAR029");
  });

  test("Should pass when all channels and operations have a description", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
