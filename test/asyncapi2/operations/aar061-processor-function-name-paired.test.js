const { linterForRule } = require("../../helpers/utils");
const fn = require("../../../functions/asa-processor-function-name-paired");

const failExample = require("./AAR061/fail-example");
const okExample = require("./AAR061/ok-example");
const failLoneProducer = require("./AAR061/fail-lone-producer");
const failUnbalancedExcessProducer = require("./AAR061/fail-unbalanced-excess-producer");
const failDuplicateConsumer = require("./AAR061/fail-duplicate-consumer");
const failRefOperation = require("./AAR061/fail-ref-operation");
const failNullChannel = require("./AAR061/fail-null-channel");
const failCoercionLone = require("./AAR061/fail-coercion-lone");
const okNullValue = require("./AAR061/ok-null-value");
const okMissingValue = require("./AAR061/ok-missing-value");
const okBlankValue = require("./AAR061/ok-blank-value");
const okCoercionPaired = require("./AAR061/ok-coercion-paired");
const okNoChannels = require("./AAR061/ok-no-channels");

const MESSAGE = (name) =>
  `AAR061: The x-scs-function-name '${name}' must be paired one-to-one between a publish/send and a subscribe/receive operation.`;

describe("AAR061: processor operations must share x-scs-function-name (AsyncAPI 2.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR061");
  });

  const run = async (document) => {
    const results = await linter.run(document);
    return results.filter((r) => r.code === "asa:AAR061");
  };

  test("reports one violation per unpaired x-scs-function-name across publish/subscribe operations", async () => {
    const results = await run(failExample);
    expect(results.length).toBe(4);
    results.forEach((r) => expect(r.code).toBe("asa:AAR061"));
  });

  test("passes when every x-scs-function-name is paired one-to-one and operations without it are ignored", async () => {
    expect((await run(okExample)).length).toBe(0);
  });

  test("error message and path point at the offending x-scs-function-name node", async () => {
    const results = await run(failLoneProducer);
    expect(results.length).toBe(1);
    expect(results[0].message).toBe(MESSAGE("loneProcessor"));
    expect(results[0].path).toEqual(["channels", "a-in", "publish", "x-scs-function-name"]);
  });

  test("flags only the excess operation when a group is unbalanced (2 publish + 1 subscribe)", async () => {
    const results = await run(failUnbalancedExcessProducer);
    expect(results.length).toBe(1);
    expect(results[0].path).toEqual(["channels", "p2", "publish", "x-scs-function-name"]);
  });

  test("flags both subscribe operations when the same x-scs-function-name is duplicated on the consumer side", async () => {
    const results = await run(failDuplicateConsumer);
    expect(results.length).toBe(2);
    results.forEach((r) => expect(r.message).toBe(MESSAGE("dupConsumer")));
  });

  test("ignores an operation declared entirely via $ref", async () => {
    const results = await run(failRefOperation);
    expect(results.length).toBe(1);
    expect(results[0].path).toEqual(["channels", "b-out", "subscribe", "x-scs-function-name"]);
  });

  test("skips a null or non-object channel value without counting it as an operation", async () => {
    const results = await run(failNullChannel);
    expect(results.length).toBe(1);
    expect(results[0].path).toEqual(["channels", "lone", "subscribe", "x-scs-function-name"]);
  });

  test("coerces a non-string x-scs-function-name so a lone numeric value is flagged with the coerced value", async () => {
    const results = await run(failCoercionLone);
    expect(results.length).toBe(1);
    expect(results[0].message).toBe(MESSAGE("123"));
  });

  test("coerces a non-string x-scs-function-name so matching numeric values on both sides pair", async () => {
    expect((await run(okCoercionPaired)).length).toBe(0);
  });

  test("ignores x-scs-function-name that is null", async () => {
    expect((await run(okNullValue)).length).toBe(0);
  });

  test("ignores an operation that omits x-scs-function-name entirely", async () => {
    expect((await run(okMissingValue)).length).toBe(0);
  });

  test("ignores empty-string and whitespace-only x-scs-function-name", async () => {
    expect((await run(okBlankValue)).length).toBe(0);
  });

  test("returns no results (and does not throw) when the document has no channels", async () => {
    expect((await run(okNoChannels)).length).toBe(0);
  });

  test("ignores x-scs-function-name whether the key is absent, explicitly undefined, or null", () => {
    const ctx = { path: [] };
    const withPublish = (publish) => ({
      asyncapi: "2.6.0",
      channels: { "a-in": { publish } },
    });
    expect(fn(withPublish({ operationId: "x" }), {}, ctx)).toEqual([]);
    expect(fn(withPublish({ operationId: "x", "x-scs-function-name": undefined }), {}, ctx)).toEqual([]);
    expect(fn(withPublish({ operationId: "x", "x-scs-function-name": null }), {}, ctx)).toEqual([]);
  });

  test("returns [] (without throwing) for a non-object document", () => {
    const ctx = { path: [] };
    expect(fn(null, {}, ctx)).toEqual([]);
    expect(fn(undefined, {}, ctx)).toEqual([]);
    expect(fn("not-a-document", {}, ctx)).toEqual([]);
    expect(fn(42, {}, ctx)).toEqual([]);
  });
});
