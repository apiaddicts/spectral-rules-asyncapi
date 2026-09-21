const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR053/fail-example");
const okExample = require("./AAR053/ok-example");
const mixedExample = require("./AAR053/mixed-example");
const customPatternOkExample = require("./AAR053/custom-pattern-ok-example");
const customPatternFailExample = require("./AAR053/custom-pattern-fail-example");

const CUSTOM_PATTERN = "^custom\\.[a-z]+\\.[a-z]+$";

describe("AAR053: Channel name must follow the corporate naming convention (AsyncAPI 3.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR053");
  });

  test("Should report one violation per invalid channel address (underscore, missing segment, empty string, leading/trailing hyphen, extra segment, uppercase, double hyphen, unicode, non-string number/boolean)", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(11);
    results.forEach((r) => {
      expect(r.code).toBe("asa:AAR053");
      expect(r.path[r.path.length - 1]).toBe("address");
    });
  });

  test("Should pass for valid addresses, version-segment variety (.v2, .v3, .v10), a null address (skipped), and a valid channel key with no address", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });

  test("Should flag only the invalid channels in a mixed document, using address or channel-key fallback as appropriate", async () => {
    const results = await linter.run(mixedExample);
    expect(results.length).toBe(2);

    const channelKeys = results.map((r) => r.path[1]).sort();
    expect(channelKeys).toEqual(
      [
        "pago_cmd.alumnos.registro-bonificacion.beca",
        "scholarshipInvalidUnderscore",
      ].sort()
    );

    const addressBased = results.filter((r) => r.path[r.path.length - 1] === "address");
    expect(addressBased.length).toBe(1);
  });

  describe("with a custom pattern via functionOptions.pattern", () => {
    let customLinter;

    beforeAll(async () => {
      customLinter = await linterForRule("asa:AAR053", {
        functionOptions: { pattern: CUSTOM_PATTERN },
      });
    });

    test("Should pass for addresses that match the custom pattern", async () => {
      const results = await customLinter.run(customPatternOkExample);
      expect(results.length).toBe(0);
    });

    test("Should flag addresses that do not match the custom pattern (even corporate-valid ones)", async () => {
      const results = await customLinter.run(customPatternFailExample);
      expect(results.length).toBe(2);
      results.forEach((r) => expect(r.path[r.path.length - 1]).toBe("address"));
      const channelKeys = results.map((r) => r.path[1]).sort();
      expect(channelKeys).toEqual(["violatesCustom1", "violatesCustom2"].sort());
    });
  });
});
