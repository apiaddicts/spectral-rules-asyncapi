const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR053/fail-example");
const okExample = require("./AAR053/ok-example");
const mixedExample = require("./AAR053/mixed-example");
const customPatternOkExample = require("./AAR053/custom-pattern-ok-example");
const customPatternFailExample = require("./AAR053/custom-pattern-fail-example");

const CUSTOM_PATTERN = "^custom\\.[a-z]+\\.[a-z]+$";

describe("AAR053: Channel name must follow the corporate naming convention (AsyncAPI 2.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR053");
  });

  test("Should report one violation per invalid channel name (underscore, missing segment, extra segment, leading hyphen, trailing hyphen, double dot, uppercase, double hyphen, unicode)", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(9);
    results.forEach((r) => expect(r.code).toBe("asa:AAR053"));

    const channelKeys = results.map((r) => r.path[1]).sort();
    expect(channelKeys).toEqual(
      [
        "-beca.cmd.alumnos.registro-bonificacion.beca",
        "beca..alumnos.registro-bonificacion.beca",
        "beca.Cmd.alumnos.registro-bonificacion.beca",
        "beca.cmd.alumnos.registro--bonificacion.beca",
        "beca.cmd.alumnos.registro-bonificacion",
        "beca.cmd.alumnos.registro-bonificacion.beca-",
        "beca.cmd.alumnos.registro-bonificacion.beca.v2.extra",
        "beca_cmd.alumnos.registro-bonificacion.beca",
        "becañ.cmd.alumnos.registro-bonificacion.beca",
      ].sort()
    );
  });

  test("Should pass for valid channel names, including version-segment variety (.v2, .v3, .v10)", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });

  test("Should flag only the invalid channels in a document that mixes valid and invalid names", async () => {
    const results = await linter.run(mixedExample);
    expect(results.length).toBe(2);
    const channelKeys = results.map((r) => r.path[1]).sort();
    expect(channelKeys).toEqual(
      [
        "beca.cmd.alumnos.registro-bonificacion",
        "beca_cmd.alumnos.registro-bonificacion.beca",
      ].sort()
    );
  });

  describe("with a custom pattern via functionOptions.pattern", () => {
    let customLinter;

    beforeAll(async () => {
      customLinter = await linterForRule("asa:AAR053", {
        functionOptions: { pattern: CUSTOM_PATTERN },
      });
    });

    test("Should pass for channel names that match the custom pattern", async () => {
      const results = await customLinter.run(customPatternOkExample);
      expect(results.length).toBe(0);
    });

    test("Should flag channel names that do not match the custom pattern (even corporate-valid ones)", async () => {
      const results = await customLinter.run(customPatternFailExample);
      expect(results.length).toBe(2);
      const channelKeys = results.map((r) => r.path[1]).sort();
      expect(channelKeys).toEqual(
        ["beca.cmd.alumnos.registro-bonificacion.beca", "custom.foo"].sort()
      );
    });
  });
});
