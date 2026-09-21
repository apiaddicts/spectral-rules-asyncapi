const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR057/fail-example");
const okExample = require("./AAR057/ok-example");
const okSingleSegment = require("./AAR057/ok-single-segment");
const failNoChannels = require("./AAR057/fail-no-channels");
const failNullChannels = require("./AAR057/fail-null-channels");
const failEmptyChannels = require("./AAR057/fail-empty-channels");
const okNullChannelValue = require("./AAR057/ok-null-channel-value");
const okNoAsyncapiVersion = require("./AAR057/ok-no-asyncapi-version");
const okNonStringAsyncapiVersion = require("./AAR057/ok-non-string-asyncapi-version");
const failStackOverflow = require("./AAR057/fail-stack-overflow");

describe("AAR057: at least one channel must be documented as an error topic (AsyncAPI 2.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR057");
  });

  test("Should report a violation when no channel matches the error-topic pattern", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(1);
    expect(results[0].code).toBe("asa:AAR057");
  });

  test("Should pass when at least one channel matches the error-topic pattern", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });

  test("Should pass for a single-segment topic with no consumer group (group is optional)", async () => {
    const results = await linter.run(okSingleSegment);
    expect(results.length).toBe(0);
  });

  test("Should report a violation when the channels key is absent", async () => {
    const results = await linter.run(failNoChannels);
    expect(results.length).toBe(1);
    expect(results[0].code).toBe("asa:AAR057");
  });

  test("Should report a violation when channels is null", async () => {
    const results = await linter.run(failNullChannels);
    expect(results.length).toBe(1);
    expect(results[0].code).toBe("asa:AAR057");
  });

  test("Should report a violation when channels is an empty object", async () => {
    const results = await linter.run(failEmptyChannels);
    expect(results.length).toBe(1);
    expect(results[0].code).toBe("asa:AAR057");
  });

  test("Should pass when a matching channel key has a null value (v2 uses the key)", async () => {
    const results = await linter.run(okNullChannelValue);
    expect(results.length).toBe(0);
  });

  test("Should treat a document with no asyncapi version as AsyncAPI 2 (matching key passes)", async () => {
    const results = await linter.run(okNoAsyncapiVersion);
    expect(results.length).toBe(0);
  });

  test("Should treat a non-string asyncapi version as AsyncAPI 2 (matching key passes)", async () => {
    const results = await linter.run(okNonStringAsyncapiVersion);
    expect(results.length).toBe(0);
  });

  test("Should fail fast on a pathologically long topic name without catastrophic backtracking", async () => {
    const results = await linter.run(failStackOverflow);
    expect(results.length).toBe(1);
    expect(results[0].code).toBe("asa:AAR057");
  });
});
