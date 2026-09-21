const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR055/fail-example");
const okExample = require("./AAR055/ok-example");

describe("AAR055: x-payload-references extension must be well-formed (AsyncAPI 2.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR055");
  });

  test("Should report one violation per invalid scenario (missing/empty fields, non-array extension, non-object item, wrong-typed field, invalid subject/ref/referenceName formats, independent occurrences)", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(13);
    results.forEach((r) => expect(r.code).toBe("asa:AAR055"));

    const touched = new Set(results.map((r) => r.path[1]));
    expect(touched).toEqual(
      new Set([
        "beca.evt.alumnos.registro-bonificacion.beca",
        "beca.evt.alumnos.registro-bonificacion.not-array",
        "beca.evt.alumnos.registro-bonificacion.item-not-object",
        "beca.evt.alumnos.registro-bonificacion.field-wrong-type",
        "beca.evt.alumnos.registro-bonificacion.multiple-occurrences",
        "beca.evt.alumnos.registro-bonificacion.invalid-ref",
        "beca.evt.alumnos.registro-bonificacion.invalid-reference-name",
        "beca.evt.alumnos.registro-bonificacion.invalid-subject",
        "beca.evt.alumnos.registro-bonificacion.reviewer-example",
        "schemas",
      ])
    );
  });

  test("Should flag exactly the malformed ref and referenceName for the reviewer's example (subject 'x' stays valid)", async () => {
    const results = await linter.run(failExample);
    const reviewer = results.filter(
      (r) => r.path[1] === "beca.evt.alumnos.registro-bonificacion.reviewer-example"
    );
    expect(reviewer.length).toBe(2);
    const flaggedFields = new Set(reviewer.map((r) => r.path[r.path.length - 1]));
    expect(flaggedFields).toEqual(new Set(["ref", "referenceName"]));
  });

  test("Should pass for well-formed items and lenient scalar (number/boolean) field values", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
