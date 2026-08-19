const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR034/fail-example");
const okExample = require("./AAR034/ok-example");

describe("AAR034: Numeric properties must declare a valid format", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR034");
  });

  test("Should fail when a numeric property declares an invalid format", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((r) => r.code === "asa:AAR034")).toBe(true);
    const props = results.map((r) => r.path[r.path.length - 1]).sort();
    expect(props).toEqual(["weight"]);
  });

  test("Should pass with valid formats or no format", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
