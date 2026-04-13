const { linterForRule } = require("../../helpers/utils");
const failNoServers = require("./AAR008/fail-no-servers");
const okHttpsProtocol = require("./AAR001/ok-https-protocol"); // reuse: has servers

describe("AAR008: Servers must be defined", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR008");
  });

  test("Should fail when servers section is missing", async () => {
    const results = await linter.run(failNoServers);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].code).toBe("asa:AAR008");
  });

  test("Should pass when servers section is present", async () => {
    const results = await linter.run(okHttpsProtocol);
    expect(results.length).toBe(0);
  });
});
