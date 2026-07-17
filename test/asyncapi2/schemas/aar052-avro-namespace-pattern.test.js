const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR052/fail-example");
const failExampleEmptyString = require("./AAR052/fail-example-empty-string");
const failExampleRef = require("./AAR052/fail-example-ref");
const okExampleApp = require("./AAR052/ok-example-app");
const okExampleCommon = require("./AAR052/ok-example-common");

describe("AAR052: Avro namespace must follow the corporate pattern", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR052");
  });

  test("Should fail when the Avro namespace does not match the corporate pattern", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].code).toBe("asa:AAR052");
  });

  test("Should fail exactly once when the namespace is an empty string", async () => {
    const results = await linter.run(failExampleEmptyString);
    expect(results.length).toBe(1);
    expect(results[0].code).toBe("asa:AAR052");
  });

  test("Should fail exactly once (not twice) when the message is reached via $ref", async () => {
    const results = await linter.run(failExampleRef);
    expect(results.length).toBe(1);
    expect(results[0].code).toBe("asa:AAR052");
  });

  test("Should pass for a valid application-schema namespace", async () => {
    const results = await linter.run(okExampleApp);
    expect(results.length).toBe(0);
  });

  test("Should pass for a valid common-schema namespace", async () => {
    const results = await linter.run(okExampleCommon);
    expect(results.length).toBe(0);
  });
});
