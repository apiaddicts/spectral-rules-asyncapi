const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR061/fail-example");
const okExample = require("./AAR061/ok-example");

describe("AAR061: processor operations must share x-scs-function-name (AsyncAPI 3.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR061");
  });

  test("Should report one violation per unpaired x-scs-function-name across send/receive operations", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(2);
    results.forEach((r) => expect(r.code).toBe("asa:AAR061"));
  });

  test("Should pass when every x-scs-function-name is paired and operations without it are ignored", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
