const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR051/fail-example");
const okExample = require("./AAR051/ok-example");

describe("AAR051: operationId must be present and in camelCase", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR051");
  });

  test("Should report exactly one violation each for missing, snake_case, PascalCase, empty string and non-string operationId", async () => {
    const results = await linter.run(failExample);
    const paths = results.map((r) => r.path.join(".")).sort();

    expect(paths).toEqual([
      "channels.order/cancelled.publish.operationId",
      "channels.order/placed.publish.operationId",
      "channels.pet/created.subscribe",
      "channels.pet/deleted.subscribe.operationId",
      "channels.pet/updated.publish.operationId",
    ]);
    results.forEach((r) => expect(r.code).toBe("asa:AAR051"));
  });

  test("Should pass when operationId is present and in camelCase", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
