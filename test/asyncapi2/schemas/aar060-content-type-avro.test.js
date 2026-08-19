const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR060/fail-example");
const okExample = require("./AAR060/ok-example");
const failFormatVariants = require("./AAR060/fail-format-variants");
const failNonStringContentType = require("./AAR060/fail-non-string-content-type");
const failSharedRef = require("./AAR060/fail-shared-ref");
const failOneofSubscribe = require("./AAR060/fail-oneof-subscribe");
const failLengthBoundary = require("./AAR060/fail-length-boundary");
const okNullContentType = require("./AAR060/ok-null-content-type");
const okNoDefaultContentType = require("./AAR060/ok-no-default-content-type");
const okGuard = require("./AAR060/ok-guard");

describe("AAR060: contentType must be application/*+avro (AsyncAPI 2.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR060");
  });

  const expectAllAAR060 = (results) =>
    results.forEach((r) => expect(r.code).toBe("asa:AAR060"));

  test("Should report one violation per non-avro contentType (inline message, oneOf member, component message) plus the defaultContentType", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(4);
    expectAllAAR060(results);
  });

  test("Should pass when every declared contentType matches application/*+avro and messages without contentType are ignored", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });

  test("Should flag near-miss (no +avro / -avro / empty subtype), empty string and wrong-case content types", async () => {
    const results = await linter.run(failFormatVariants);
    expect(results.length).toBe(6);
    expectAllAAR060(results);
  });

  test("Should flag non-string scalar content types (number, boolean)", async () => {
    const results = await linter.run(failNonStringContentType);
    expect(results.length).toBe(2);
    expectAllAAR060(results);
  });

  test("Should validate a $ref message once at its definition and never at the ref sites", async () => {
    const results = await linter.run(failSharedRef);
    expect(results.length).toBe(1);
    expectAllAAR060(results);
  });

  test("Should descend oneOf on a subscribe message and skip $ref members (validated once at their definition)", async () => {
    const results = await linter.run(failOneofSubscribe);
    expect(results.length).toBe(2);
    expectAllAAR060(results);
  });

  test("Should honour the .{1,255} length bound (255-char subtype valid, 256 flagged)", async () => {
    const results = await linter.run(failLengthBoundary);
    expect(results.length).toBe(1);
    expectAllAAR060(results);
  });

  test("Should treat explicit null contentType / defaultContentType as absent (not reported)", async () => {
    const results = await linter.run(okNullContentType);
    expect(results.length).toBe(0);
  });

  test("Should not flag an absent defaultContentType, nor a message without contentType", async () => {
    const results = await linter.run(okNoDefaultContentType);
    expect(results.length).toBe(0);
  });

  test("Should skip null/scalar/empty channels and a missing components section without crashing", async () => {
    const results = await linter.run(okGuard);
    expect(results.length).toBe(0);
  });

  test("Should return no issues (and not crash) when the root document is not an object", async () => {
    expect((await linter.run("42")).length).toBe(0);
    expect((await linter.run("- one\n- two")).length).toBe(0);
  });
});
