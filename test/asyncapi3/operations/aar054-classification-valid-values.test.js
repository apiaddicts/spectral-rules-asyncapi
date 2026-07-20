const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR054/fail-example");
const okExample = require("./AAR054/ok-example");

describe("AAR054: Channel classification segment must be cdc, cmd or sys (AsyncAPI 3.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR054");
  });

  test("Should report one violation per invalid classification (unknown value, missing segment, non-string address types)", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(4);
    results.forEach((r) => {
      expect(r.code).toBe("asa:AAR054");
      expect(r.path[r.path.length - 1]).toBe("address");
    });
  });

  test("Should pass for valid classifications (cdc, cmd, sys) and skip a channel with a null address", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
