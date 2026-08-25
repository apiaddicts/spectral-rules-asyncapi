const { linterForRule } = require("../../helpers/utils");

const okExample = require("./AAR064/ok-example");
const okSkipCases = require("./AAR064/ok-skip-cases");
const okNoServers = require("./AAR064/ok-no-servers");
const okNullServers = require("./AAR064/ok-null-servers");
const okEmptyServersObject = require("./AAR064/ok-empty-servers-object");
const okEmptyServersArray = require("./AAR064/ok-empty-servers-array");
const okRefServerValid = require("./AAR064/ok-ref-server-valid");

const failExample = require("./AAR064/fail-example");
const failRefServer = require("./AAR064/fail-ref-server");
const failNonstring = require("./AAR064/fail-nonstring");
const failEmptyAndWhitespace = require("./AAR064/fail-empty-and-whitespace");
const failWrongCase = require("./AAR064/fail-wrong-case");
const failObjectAndArray = require("./AAR064/fail-object-and-array");
const failArrayMixed = require("./AAR064/fail-array-mixed");

describe("AAR064: server protocol must be kafka or kafka-ssl (AsyncAPI 3.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR064");
  });

  const run = async (doc) => {
    const results = await linter.run(doc);
    return results.filter((r) => r.code === "asa:AAR064");
  };

  describe("compliant / skipped documents (zero issues)", () => {
    test("passes when the server uses kafka-ssl", async () => {
      expect(await run(okExample)).toHaveLength(0);
    });

    test("skips null servers, scalar servers, and missing / null protocol", async () => {
      expect(await run(okSkipCases)).toHaveLength(0);
    });

    test("passes when there is no servers section", async () => {
      expect(await run(okNoServers)).toHaveLength(0);
    });

    test("passes when servers is null", async () => {
      expect(await run(okNullServers)).toHaveLength(0);
    });

    test("passes when servers is an empty object", async () => {
      expect(await run(okEmptyServersObject)).toHaveLength(0);
    });

    test("passes when servers is an empty array", async () => {
      expect(await run(okEmptyServersArray)).toHaveLength(0);
    });

    test("accepts a valid Kafka protocol defined under components.servers", async () => {
      expect(await run(okRefServerValid)).toHaveLength(0);
    });
  });

  describe("non-compliant documents", () => {
    test("reports a server using a non-Kafka protocol", async () => {
      expect(await run(failExample)).toHaveLength(1);
    });

    test("reports a non-Kafka protocol on a server defined under components.servers (referenced via $ref)", async () => {
      expect(await run(failRefServer)).toHaveLength(1);
    });

    test("reports non-string scalar protocols (number / boolean)", async () => {
      expect(await run(failNonstring)).toHaveLength(2);
    });

    test("reports empty-string, whitespace-only and padded protocols", async () => {
      expect(await run(failEmptyAndWhitespace)).toHaveLength(3);
    });

    test("reports case variants (matching is case-sensitive)", async () => {
      expect(await run(failWrongCase)).toHaveLength(2);
    });

    test("reports object and single-element array protocols", async () => {
      expect(await run(failObjectAndArray)).toHaveLength(2);
    });

    test("reports each non-compliant server in the array form independently", async () => {
      expect(await run(failArrayMixed)).toHaveLength(1);
    });
  });

  describe("issue shape", () => {
    test("carries the AAR064 code / message on every reported server", async () => {
      const results = await run(failExample);
      expect(results).toHaveLength(1);
      expect(results[0].code).toBe("asa:AAR064");
      expect(results[0].message).toMatch(/^AAR064:/);
    });
  });
});
