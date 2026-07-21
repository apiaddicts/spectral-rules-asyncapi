const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR056/fail-example");
const okExample = require("./AAR056/ok-example");

describe("AAR056: schemaFormat must be application/vnd.apache.avro;version=1.9.0 when Avro (AsyncAPI 2.x)", () => {
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
});
