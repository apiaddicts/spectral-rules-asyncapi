const { linterForRule } = require("../../helpers/utils");
const fn = require("../../../functions/asa-processor-function-name-paired");

const failExample = require("./AAR061/fail-example");
const okExample = require("./AAR061/ok-example");
const failLoneReceiver = require("./AAR061/fail-lone-receiver");
const failUnbalancedExcessSend = require("./AAR061/fail-unbalanced-excess-send");
const failDuplicateSend = require("./AAR061/fail-duplicate-send");
const failRefOperation = require("./AAR061/fail-ref-operation");
const failNullOperation = require("./AAR061/fail-null-operation");
const failCoercionLone = require("./AAR061/fail-coercion-lone");
const okNullValue = require("./AAR061/ok-null-value");
const okMissingValue = require("./AAR061/ok-missing-value");
const okBlankValue = require("./AAR061/ok-blank-value");
const okCoercionPaired = require("./AAR061/ok-coercion-paired");
const okNoOperations = require("./AAR061/ok-no-operations");

const MESSAGE = (name) =>
  `AAR061: The x-scs-function-name '${name}' must be paired one-to-one between a publish/send and a subscribe/receive operation.`;

describe("AAR061: processor operations must share x-scs-function-name (AsyncAPI 3.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR061");
  });

  const run = async (document) => {
    const results = await linter.run(document);
    return results.filter((r) => r.code === "asa:AAR061");
  };

  test("reports one violation per unpaired x-scs-function-name across send/receive operations", async () => {
    const results = await run(failExample);
    expect(results.length).toBe(2);
    results.forEach((r) => expect(r.code).toBe("asa:AAR061"));
  });

  test("passes when every x-scs-function-name is paired one-to-one and operations without it are ignored", async () => {
    expect((await run(okExample)).length).toBe(0);
  });

  test("error message and path point at the offending x-scs-function-name node, even when the channel is a $ref", async () => {
    const results = await run(failLoneReceiver);
    expect(results.length).toBe(1);
    expect(results[0].message).toBe(MESSAGE("loneProcessor"));
    expect(results[0].path).toEqual(["operations", "consumeA", "x-scs-function-name"]);
  });

  test("flags only the excess operation when a group is unbalanced (2 send + 1 receive)", async () => {
    const results = await run(failUnbalancedExcessSend);
    expect(results.length).toBe(1);
    expect(results[0].path).toEqual(["operations", "s2", "x-scs-function-name"]);
  });

  test("flags both send operations when the same x-scs-function-name is duplicated with no receive", async () => {
    const results = await run(failDuplicateSend);
    expect(results.length).toBe(2);
    results.forEach((r) => expect(r.message).toBe(MESSAGE("dupProducer")));
  });

  test("ignores an operation declared entirely via $ref (no action)", async () => {
    const results = await run(failRefOperation);
    expect(results.length).toBe(1);
    expect(results[0].path).toEqual(["operations", "r1", "x-scs-function-name"]);
  });

  test("skips a null or non-object operation value without throwing", async () => {
    const results = await run(failNullOperation);
    expect(results.length).toBe(1);
    expect(results[0].path).toEqual(["operations", "r1", "x-scs-function-name"]);
  });

  test("coerces a non-string x-scs-function-name so a lone boolean value is flagged with the coerced value", async () => {
    const results = await run(failCoercionLone);
    expect(results.length).toBe(1);
    expect(results[0].message).toBe(MESSAGE("true"));
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

  test("returns no results (and does not throw) when the document has no operations", async () => {
    expect((await run(okNoOperations)).length).toBe(0);
  });

  // Function-level check for an input that cannot be expressed as a linted document.
  test("returns [] (without throwing) for a non-object document", () => {
    const ctx = { path: [] };
    expect(fn(null, {}, ctx)).toEqual([]);
    expect(fn(undefined, {}, ctx)).toEqual([]);
    expect(fn("not-a-document", {}, ctx)).toEqual([]);
    expect(fn(42, {}, ctx)).toEqual([]);
  });
});
