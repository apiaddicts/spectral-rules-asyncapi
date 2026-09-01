const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR063/fail-example");
const okExample = require("./AAR063/ok-example");
const failNonString = require("./AAR063/fail-non-string");
const okMissing = require("./AAR063/ok-missing");
const okEmpty = require("./AAR063/ok-empty");
const okSpaces = require("./AAR063/ok-spaces");

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
    const results = await linter.run(okMissing);
    expect(results.length).toBe(0);
  });

  test("Should not report when the asyncapi field is empty", async () => {
    const results = await linter.run(okEmpty);
    expect(results.length).toBe(0);
  });

  test("Should pass when the version is an allowed version padded with spaces", async () => {
    const results = await linter.run(okSpaces);
    expect(results.length).toBe(0);
  });

  test("Should report when the asyncapi value is a non-string (number)", async () => {
    const results = await linter.run(failNonString);
    expect(results.length).toBe(1);
    results.forEach((r) => expect(r.code).toBe("asa:AAR063"));
  });

  test("Should report with the expected message and path", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(1);
    expect(results[0].message).toBe(
      "AAR063: The asyncapi version must be one of the versions allowed by the organization"
    );
    expect(results[0].path).toEqual(["asyncapi"]);
  });

  test("Should pass when a non-default version is added to allowedVersions", async () => {
    const configuredLinter = await linterForRule("asa:AAR063", {
      functionOptions: { allowedVersions: "2.4.0,2.6.0" },
    });
    const results = await configuredLinter.run(failExample);
    expect(results.length).toBe(0);
  });

  test("Should trim spaces and drop empty entries in allowedVersions", async () => {
    const configuredLinter = await linterForRule("asa:AAR063", {
      functionOptions: { allowedVersions: "2.6.0, ,2.4.0" },
    });
    const results = await configuredLinter.run(failExample);
    expect(results.length).toBe(0);
  });
});
