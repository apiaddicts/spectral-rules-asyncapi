const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR057/fail-example");
const okExample = require("./AAR057/ok-example");
const okSingleSegment = require("./AAR057/ok-single-segment");
const failNoChannels = require("./AAR057/fail-no-channels");
const failNullChannels = require("./AAR057/fail-null-channels");
const failEmptyChannels = require("./AAR057/fail-empty-channels");
const failMissingAddress = require("./AAR057/fail-missing-address");
const failNullAddressOnly = require("./AAR057/fail-null-address-only");
const failStringChannel = require("./AAR057/fail-string-channel");
const failArrayChannel = require("./AAR057/fail-array-channel");
const failNonStringAddress = require("./AAR057/fail-non-string-address");
const failEmptyStringAddress = require("./AAR057/fail-empty-string-address");
const failStackOverflow = require("./AAR057/fail-stack-overflow");

describe("AAR057: at least one channel must be documented as an error topic (AsyncAPI 3.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR057");
  });

  test("Should report a violation when no channel matches the error-topic pattern", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(1);
    expect(results[0].code).toBe("asa:AAR057");
  });

  test("Should pass when at least one channel matches the error-topic pattern, ignoring null-address channels", async () => {
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

  test("Should skip a channel whose address key is entirely absent", async () => {
    const results = await linter.run(failMissingAddress);
    expect(results.length).toBe(1);
    expect(results[0].code).toBe("asa:AAR057");
  });

  test("Should not throw and still report when the only channel has a null address", async () => {
    const results = await linter.run(failNullAddressOnly);
    expect(results.length).toBe(1);
    expect(results[0].code).toBe("asa:AAR057");
  });

  test("Should skip a channel whose value is a string (non-object)", async () => {
    const results = await linter.run(failStringChannel);
    expect(results.length).toBe(1);
    expect(results[0].code).toBe("asa:AAR057");
  });

  test("Should skip a channel whose value is an array (non-object)", async () => {
    const results = await linter.run(failArrayChannel);
    expect(results.length).toBe(1);
    expect(results[0].code).toBe("asa:AAR057");
  });

  test("Should report a violation when the only declared address is a non-string (ignored)", async () => {
    const results = await linter.run(failNonStringAddress);
    expect(results.length).toBe(1);
    expect(results[0].code).toBe("asa:AAR057");
  });

  test("Should report a violation when the only declared address is an empty string", async () => {
    const results = await linter.run(failEmptyStringAddress);
    expect(results.length).toBe(1);
    expect(results[0].code).toBe("asa:AAR057");
  });

  test("Should fail fast on a pathologically long address without catastrophic backtracking", async () => {
    const results = await linter.run(failStackOverflow);
    expect(results.length).toBe(1);
    expect(results[0].code).toBe("asa:AAR057");
  });
});
