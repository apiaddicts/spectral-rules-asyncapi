const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR062/fail-example");
const okExample = require("./AAR062/ok-example");

describe("AAR062: subscribe operations must declare a consumer group (AsyncAPI 2.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR062");
  });

  test("Should report one violation per subscribe operation missing a consumer group", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(2);
    results.forEach((r) => expect(r.code).toBe("asa:AAR062"));
  });

  test("Should pass when subscribe operations declare x-scs-group or bindings.kafka.groupId and publish operations are ignored", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
