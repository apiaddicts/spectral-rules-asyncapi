const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR032/fail-example");
const okExample = require("./AAR032/ok-example");

describe("AAR032: Numeric properties should declare a value restriction", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR032");
  });

  test("Should fail when a numeric property has no value restriction", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((r) => r.code === "asa:AAR032")).toBe(true);
    const props = results.map((r) => r.path[r.path.length - 1]).sort();
    expect(props).toEqual(["sensorId", "temperature"]);
  });

  test("Should pass when every numeric property declares a restriction", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
