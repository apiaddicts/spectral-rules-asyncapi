const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR063/fail-example");
const okExample = require("./AAR063/ok-example");

describe("AAR063: asyncapi version must be one of the allowed versions (AsyncAPI 2.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR063");
  });

  test("Should report a violation when the version is not in the default allow-list", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(1);
    results.forEach((r) => expect(r.code).toBe("asa:AAR063"));
  });

  test("Should pass when the version is the default allowed 2.6.0", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });

  test("Should not report when the asyncapi field is missing", async () => {
    const results = await linter.run({
      info: { version: "1.0.0", title: "No version" },
      channels: {},
    });
    expect(results.length).toBe(0);
  });

  test("Should not report when the asyncapi field is empty", async () => {
    const results = await linter.run({
      asyncapi: "",
      info: { version: "1.0.0", title: "Empty version" },
      channels: {},
    });
    expect(results.length).toBe(0);
  });

  test("Should pass when a non-default version is added to allowedVersions", async () => {
    const configuredLinter = await linterForRule("asa:AAR063", {
      functionOptions: { allowedVersions: "2.4.0,2.6.0" },
    });
    const results = await configuredLinter.run(failExample);
    expect(results.length).toBe(0);
  });
});
