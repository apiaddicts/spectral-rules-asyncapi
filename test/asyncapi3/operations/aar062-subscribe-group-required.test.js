const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR062/fail-example");
const okExample = require("./AAR062/ok-example");
const failEmptyGroup = require("./AAR062/fail-empty-group");
const failObjectGroup = require("./AAR062/fail-object-group");
const failKafkaNoGroupId = require("./AAR062/fail-kafka-no-groupid");
const okRefOperation = require("./AAR062/ok-ref-operation");
const okSkipOperations = require("./AAR062/ok-skip-operations");
const okScalarGroupId = require("./AAR062/ok-scalar-groupid");
const okNoOperations = require("./AAR062/ok-no-operations");

describe("AAR062: receive operations must declare a consumer group (AsyncAPI 3.x)", () => {
  let linter;

  const run = async (doc) =>
    (await linter.run(doc)).filter((r) => r.code === "asa:AAR062");

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR062");
  });

  test("Should report one violation per receive operation missing a consumer group", async () => {
    const results = await run(failExample);
    expect(results.length).toBe(2);
    results.forEach((r) => expect(r.code).toBe("asa:AAR062"));
  });

  test("Should pass when receive operations declare x-scs-group or bindings.kafka.groupId and send operations are ignored", async () => {
    const results = await run(okExample);
    expect(results.length).toBe(0);
  });

  test("Should report an empty or whitespace-only x-scs-group as no group", async () => {
    const results = await run(failEmptyGroup);
    expect(results.length).toBe(2);
    results.forEach((r) => expect(r.code).toBe("asa:AAR062"));
  });

  test("Should report a non-scalar x-scs-group (object or array) as no group", async () => {
    const results = await run(failObjectGroup);
    expect(results.length).toBe(2);
    results.forEach((r) => expect(r.code).toBe("asa:AAR062"));
  });

  test("Should report kafka bindings that lack a usable groupId", async () => {
    const results = await run(failKafkaNoGroupId);
    expect(results.length).toBe(2);
    results.forEach((r) => expect(r.code).toBe("asa:AAR062"));
  });

  test("Should skip an operation that is itself a $ref", async () => {
    const results = await run(okRefOperation);
    expect(results.length).toBe(0);
  });

  test("Should skip null operations and operations without action: receive", async () => {
    const results = await run(okSkipOperations);
    expect(results.length).toBe(0);
  });

  test("Should accept a scalar bindings.kafka.groupId", async () => {
    const results = await run(okScalarGroupId);
    expect(results.length).toBe(0);
  });

  test("Should not fail on a document without operations", async () => {
    const results = await run(okNoOperations);
    expect(results.length).toBe(0);
  });
});
