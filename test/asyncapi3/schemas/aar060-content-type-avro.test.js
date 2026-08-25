const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR060/fail-example");
const okExample = require("./AAR060/ok-example");
const failFormatVariants = require("./AAR060/fail-format-variants");
const failNonStringContentType = require("./AAR060/fail-non-string-content-type");
const failSharedRef = require("./AAR060/fail-shared-ref");
const failLengthBoundary = require("./AAR060/fail-length-boundary");
const okNullContentType = require("./AAR060/ok-null-content-type");
const okNoDefaultContentType = require("./AAR060/ok-no-default-content-type");
const okGuard = require("./AAR060/ok-guard");
const failOneof = require("./AAR060/fail-oneof");
const failTraitsContentType = require("./AAR060/fail-traits-content-type");
const okTraitsContentType = require("./AAR060/ok-traits-content-type");
const failReusableChannel = require("./AAR060/fail-reusable-channel");

describe("AAR060: contentType must be application/*+avro (AsyncAPI 3.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR060");
  });

  const expectAllAAR060 = (results) =>
    results.forEach((r) => expect(r.code).toBe("asa:AAR060"));

  test("Should report one violation per non-avro contentType (channel message, component message) plus the defaultContentType", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(3);
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

  test("Should skip null/scalar channels and a null messages map without crashing", async () => {
    const results = await linter.run(okGuard);
    expect(results.length).toBe(0);
  });

  test("Should descend a v3 message-level oneOf and flag each non-avro member", async () => {
    const results = await linter.run(failOneof);
    expect(results.length).toBe(1);
    expectAllAAR060(results);
  });

  test("Should flag a contentType declared only in a message trait", async () => {
    const results = await linter.run(failTraitsContentType);
    expect(results.length).toBe(1);
    expectAllAAR060(results);
  });

  test("Should pass when the trait contentType is valid or the message's own contentType overrides it", async () => {
    const results = await linter.run(okTraitsContentType);
    expect(results.length).toBe(0);
  });

  test("Should validate a message inside a reusable components channel referenced via $ref", async () => {
    const results = await linter.run(failReusableChannel);
    expect(results.length).toBe(1);
    expectAllAAR060(results);
  });

  test("Should not crash when channels and components are entirely absent", async () => {
    const results = await linter.run({
      asyncapi: "3.0.0",
      info: { version: "1.0.0", title: "No channels" },
      defaultContentType: "application/vnd.apache.avro+avro",
    });
    expect(results.length).toBe(0);
  });

  test("Should return no issues (and not crash) when the root document is not an object", async () => {
    expect((await linter.run("42")).length).toBe(0);
    expect((await linter.run("- one\n- two")).length).toBe(0);
  });
});
