const { linterForRule } = require("../../helpers/utils");
const failHttpProtocol = require("./AAR001/fail-http-protocol");
const okHttpsProtocol = require("./AAR001/ok-https-protocol");

describe("AAR001: HTTPS protocol is mandatory", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR001");
  });

  test("Should fail when server uses HTTP protocol", async () => {
    const results = await linter.run(failHttpProtocol);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].code).toBe("asa:AAR001");
  });

  test("Should pass when server uses HTTPS protocol", async () => {
    const results = await linter.run(okHttpsProtocol);
    expect(results.length).toBe(0);
  });
});
