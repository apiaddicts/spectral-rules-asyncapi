const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR058/fail-example");
const okExample = require("./AAR058/ok-example");

describe("AAR058: retry channels must follow the retry-topic naming convention (AsyncAPI 3.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR058");
  });

  test("Should report one violation per retry channel that does not match the required pattern, ignoring non-retry and null-address channels", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(5);
    results.forEach((r) => {
      expect(r.code).toBe("asa:AAR058");
      expect(r.path[r.path.length - 1]).toBe("address");
    });
  });

  test("Should pass for valid retry channels, ignoring non-retry and null-address channels", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
