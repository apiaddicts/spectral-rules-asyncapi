const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR059/fail-example");
const okExample = require("./AAR059/ok-example");
const boundsExample = require("./AAR059/bounds-example");
const formatVariantsExample = require("./AAR059/format-variants-example");
const nonStringNameExample = require("./AAR059/non-string-name-example");
const nameGuardExample = require("./AAR059/name-guard-example");

describe("AAR059: Avro record names must be in CamelCase (AsyncAPI 3.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR059");
  });

  test("Should report one violation per non-CamelCase Avro record name, including nested/union/array/map records, and not double-count a record shared via $ref", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(8);
    results.forEach((r) => expect(r.code).toBe("asa:AAR059"));
  });

  test("Should pass for CamelCase record names at every nesting level", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });

  test("Should enforce the bounded quantifiers: accept names at the exact limit, reject names over it, and reject very long inputs without crashing", async () => {
    const results = await linter.run(boundsExample);
    expect(results.length).toBe(4);
    results.forEach((r) => expect(r.code).toBe("asa:AAR059"));
  });

  test("Should reject lowerCamelCase, a leading digit, an empty name, a single letter, and a leading acronym", async () => {
    const results = await linter.run(formatVariantsExample);
    expect(results.length).toBe(5);
    results.forEach((r) => expect(r.code).toBe("asa:AAR059"));
  });

  test("Should flag a non-string name (number, boolean, object, array), matching Sonar", async () => {
    const results = await linter.run(nonStringNameExample);
    expect(results.length).toBe(4);
    results.forEach((r) => expect(r.code).toBe("asa:AAR059"));
  });

  test("Should not flag a record with a missing or null name", async () => {
    const results = await linter.run(nameGuardExample);
    expect(results.length).toBe(0);
  });
});
