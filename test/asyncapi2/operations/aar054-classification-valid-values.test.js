const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR054/fail-example");
const okExample = require("./AAR054/ok-example");

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
});
