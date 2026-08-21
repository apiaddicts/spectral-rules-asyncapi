const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR033/fail-example");
const okExample = require("./AAR033/ok-example");

describe("AAR033: String properties should declare a value restriction", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR033");
  });

  test("Should fail when a string property has no value restriction", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((r) => r.code === "asa:AAR033")).toBe(true);
    const props = results.map((r) => r.path[r.path.length - 1]).sort();
    expect(props).toEqual(["username"]);
  });

  test("Should pass when every string property declares a restriction", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
