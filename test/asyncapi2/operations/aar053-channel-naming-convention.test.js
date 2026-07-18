const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR053/fail-example");
const okExample = require("./AAR053/ok-example");

describe("AAR053: Channel name must follow the corporate naming convention (AsyncAPI 2.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR053");
  });

  test("Should report one violation per invalid channel name (underscore, missing segment, extra segment, leading hyphen, trailing hyphen, double dot)", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(6);
    results.forEach((r) => expect(r.code).toBe("asa:AAR053"));

    const channelKeys = results.map((r) => r.path[1]).sort();
    expect(channelKeys).toEqual(
      [
        "-beca.cmd.alumnos.registro-bonificacion.beca",
        "beca..alumnos.registro-bonificacion.beca",
        "beca.cmd.alumnos.registro-bonificacion",
        "beca.cmd.alumnos.registro-bonificacion.beca-",
        "beca.cmd.alumnos.registro-bonificacion.beca.v2.extra",
        "beca_cmd.alumnos.registro-bonificacion.beca",
      ].sort()
    );
  });

  test("Should pass for a valid 5-segment channel name and a valid 6-segment (versioned) channel name", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });
});
