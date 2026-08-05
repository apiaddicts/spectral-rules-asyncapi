const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR063/fail-example");

describe("AAR063: asyncapi version must be one of the allowed versions (AsyncAPI 3.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR063");
  });

  test("Should report a violation for 3.0.0 under the default 2.6.0 allow-list", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(1);
    results.forEach((r) => expect(r.code).toBe("asa:AAR063"));
  });

  test("Should pass for the same 3.0.0 document once allowedVersions includes 3.0.0", async () => {
    const configuredLinter = await linterForRule("asa:AAR063", {
      functionOptions: { allowedVersions: "2.6.0,3.0.0" },
    });
    const results = await configuredLinter.run(failExample);
    expect(results.length).toBe(0);
  });
});
