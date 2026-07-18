const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR053/fail-example");
const okExample = require("./AAR053/ok-example");

describe("AAR053: Channel name must follow the corporate naming convention (AsyncAPI 3.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR053");
  });

  test("Should report one violation per invalid channel address (underscore, missing segment, empty string)", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(3);
    results.forEach((r) => {
      expect(r.code).toBe("asa:AAR053");
      expect(r.path[r.path.length - 1]).toBe("address");
    });
  });

  test("Should pass for valid addresses and skip a channel with a null address", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
