const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR057/fail-example");
const okExample = require("./AAR057/ok-example");

describe("AAR057: at least one channel must be documented as an error topic (AsyncAPI 3.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR057");
  });

  test("Should report a violation when no channel matches the error-topic pattern", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(1);
    expect(results[0].code).toBe("asa:AAR057");
  });

  test("Should pass when at least one channel matches the error-topic pattern, ignoring null-address channels", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
