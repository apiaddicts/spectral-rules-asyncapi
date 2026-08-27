const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR051/fail-example");
const okExample = require("./AAR051/ok-example");
const okStructuralEdges = require("./AAR051/ok-structural-edges");
const okNoOperations = require("./AAR051/ok-no-operations");

const pathsOf = (results) => results.map((r) => r.path.join(".")).sort();

describe("AAR051 (AsyncAPI 3.x): the operation key must be in camelCase", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR051");
  });

  test("Should report exactly one violation per operation key that is not camelCase", async () => {
    const results = await linter.run(failExample);

    expect(pathsOf(results)).toEqual([
      "components.operations.SharedOperation",
      "operations.",
      "operations.2sendOrderPlaced",
      "operations.SEND_ORDER_CANCELLED",
      "operations.SendPetCreated",
      "operations.send order shipped",
      "operations.send-pet-deleted",
      "operations.send_pet_updated",
    ]);
    results.forEach((r) => expect(r.code).toBe("asa:AAR051"));
  });

  test("Should pass when every operation key is in camelCase", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });

  test("Should skip null, scalar and empty operations and ignore channel level operations", async () => {
    const results = await linter.run(okStructuralEdges);
    expect(results.length).toBe(0);
  });

  test("Should pass when the document declares no operations", async () => {
    const results = await linter.run(okNoOperations);
    expect(results.length).toBe(0);
  });
});
