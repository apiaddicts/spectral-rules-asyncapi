const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR055/fail-example");
const okExample = require("./AAR055/ok-example");

describe("AAR055: x-payload-references extension must be well-formed (AsyncAPI 2.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR055");
  });

  test("Should report one violation per invalid scenario (missing/empty fields, non-array extension, non-object item, wrong-typed field, independent occurrences)", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(8);
    results.forEach((r) => expect(r.code).toBe("asa:AAR055"));

    const touched = new Set(results.map((r) => r.path[1]));
    expect(touched).toEqual(
      new Set([
        "beca.evt.alumnos.registro-bonificacion.beca",
        "beca.evt.alumnos.registro-bonificacion.not-array",
        "beca.evt.alumnos.registro-bonificacion.item-not-object",
        "beca.evt.alumnos.registro-bonificacion.field-wrong-type",
        "beca.evt.alumnos.registro-bonificacion.multiple-occurrences",
        "schemas",
      ])
    );
  });

  test("Should pass for well-formed items and lenient scalar (number/boolean) field values", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
