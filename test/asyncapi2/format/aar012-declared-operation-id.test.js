const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR012/fail-example");
const okExample = require("./AAR012/ok-example");

describe("AAR012: Operations must declare an operationId", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR012");
  });

  test("Should fail when an operation lacks operationId", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].code).toBe("asa:AAR012");
  });

  test("Should pass when all operations declare a valid operationId", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
