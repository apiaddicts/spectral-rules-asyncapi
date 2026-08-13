const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR056/fail-example");
const okExample = require("./AAR056/ok-example");
const nonStringExample = require("./AAR056/non-string-example");
const wrongCaseExample = require("./AAR056/wrong-case-example");
const wrongFormatExample = require("./AAR056/wrong-format-example");
const mixedExample = require("./AAR056/mixed-example");

describe("AAR056: schemaFormat must be application/vnd.apache.avro;version=1.9.0 when Avro (AsyncAPI 3.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR056");
  });

  test("Should report one violation per Avro schemaFormat that isn't exactly version 1.9.0", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(2);
    results.forEach((r) => expect(r.code).toBe("asa:AAR056"));

    const touched = new Set(results.map((r) => r.path[1]));
    expect(touched).toEqual(new Set(["carga", "schemas"]));
  });

  test("Should pass for the exact Avro schemaFormat and for non-Avro schemaFormat values", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });

  test("Should skip non-string schemaFormat values (number, boolean, null, object, array)", async () => {
    const results = await linter.run(nonStringExample);
    expect(results.length).toBe(0);
  });

  test("Should flag a mis-cased Avro schemaFormat (case-insensitive detection)", async () => {
    const results = await linter.run(wrongCaseExample);
    expect(results.length).toBe(2);
    results.forEach((r) => expect(r.code).toBe("asa:AAR056"));
    const touched = new Set(results.map((r) => r.path[1]));
    expect(touched).toEqual(new Set(["upperCase", "mixedCase"]));
  });

  test("Should flag an Avro schemaFormat with wrong formatting (whitespace, extra parameter)", async () => {
    const results = await linter.run(wrongFormatExample);
    expect(results.length).toBe(2);
    results.forEach((r) => expect(r.code).toBe("asa:AAR056"));
    const touched = new Set(results.map((r) => r.path[1]));
    expect(touched).toEqual(new Set(["whitespace", "charset"]));
  });

  test("Should flag only the wrong-version channel when valid and invalid coexist", async () => {
    const results = await linter.run(mixedExample);
    expect(results.length).toBe(1);
    expect(results[0].code).toBe("asa:AAR056");
    expect(results[0].path[1]).toBe("wrongCarga");
  });
});
