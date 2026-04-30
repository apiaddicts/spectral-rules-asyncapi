const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR016/fail-example");
const okExample = require("./AAR016/ok-example");

describe("AAR016: Contact object must include name, url, and email", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR016");
  });

  test("Should fail when the contact object is missing required fields", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].code).toBe("asa:AAR016");
  });

  test("Should pass when the contact object has name, url, and email", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
