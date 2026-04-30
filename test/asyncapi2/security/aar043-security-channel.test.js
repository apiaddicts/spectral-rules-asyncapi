const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR043/fail-example");
const okExample = require("./AAR043/ok-example");

describe("AAR043: Channel operations should define a security scheme", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR043");
  });

  test("Should fail when channel operations lack a security scheme", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].code).toBe("asa:AAR043");
  });

  test("Should pass when all channel operations define a security scheme", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
