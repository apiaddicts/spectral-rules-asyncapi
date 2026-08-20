const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR054/fail-example");
const okExample = require("./AAR054/ok-example");
const customValuesExample = require("./AAR054/custom-values-example");
const edgeFailExample = require("./AAR054/edge-fail-example");
const mixedExample = require("./AAR054/mixed-example");
const nullChannelExample = require("./AAR054/null-channel-example");

describe("AAR054: Channel classification segment must be cdc, cmd or sys (AsyncAPI 2.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR054");
  });

  test("Should report one violation per invalid classification value (evt, event, CMD, numeric key)", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(4);
    results.forEach((r) => expect(r.code).toBe("asa:AAR054"));

    const channelKeys = results.map((r) => r.path[1]).sort();
    expect(channelKeys).toEqual(
      [
        "123.456",
        "beca.CMD.alumnos.registro-bonificacion.beca",
        "beca.event.alumnos.registro-bonificacion.beca",
        "beca.evt.alumnos.registro-bonificacion.beca",
      ].sort()
    );
  });

  test("Should pass for channels classified as cdc, cmd or sys", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });

  test("Should flag a missing classification segment (bare key with no dot) and an empty segment (double dot)", async () => {
    const results = await linter.run(edgeFailExample);
    expect(results.length).toBe(2);
    const channelKeys = results.map((r) => r.path[1]).sort();
    expect(channelKeys).toEqual(["beca", "beca..alumnos.registro-bonificacion.beca"].sort());
  });

  test("Should flag only the invalid channels in a document mixing valid and invalid classifications", async () => {
    const results = await linter.run(mixedExample);
    expect(results.length).toBe(1);
    expect(results[0].path[1]).toBe("beca.evt.alumnos.registro-bonificacion.beca");
  });

  test("Should validate a null-valued channel by its key (invalid key flagged, valid key skipped)", async () => {
    const results = await linter.run(nullChannelExample);
    expect(results.length).toBe(1);
    expect(results[0].path[1]).toBe("foo");
  });

  describe("custom validValues via functionOptions", () => {
    test("Should pass when validValues is extended to include the classification (evt)", async () => {
      const customLinter = await linterForRule("asa:AAR054", {
        functionOptions: { validValues: ["cdc", "cmd", "sys", "evt"] },
      });
      const results = await customLinter.run(customValuesExample);
      expect(results.length).toBe(0);
    });

    test("Should flag a default-valid classification (cmd) when validValues is restricted", async () => {
      const customLinter = await linterForRule("asa:AAR054", {
        functionOptions: { validValues: ["evt"] },
      });
      const results = await customLinter.run(customValuesExample);
      expect(results.length).toBe(1);
      expect(results[0].path[1]).toBe("beca.cmd.alumnos.registro-bonificacion.beca");
    });
  });
});
