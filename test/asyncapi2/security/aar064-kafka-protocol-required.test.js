const { linterForRule } = require("../../helpers/utils");

const okExample = require("./AAR064/ok-example");
const okSkipCases = require("./AAR064/ok-skip-cases");
const okNoServers = require("./AAR064/ok-no-servers");
const okNullServers = require("./AAR064/ok-null-servers");
const okEmptyServers = require("./AAR064/ok-empty-servers");
const okRefServer = require("./AAR064/ok-ref-server");

const failExample = require("./AAR064/fail-example");
const failWrongCase = require("./AAR064/fail-wrong-case");
const failWhitespace = require("./AAR064/fail-whitespace");
const failNumeric = require("./AAR064/fail-numeric");
const failObjectProtocol = require("./AAR064/fail-object-protocol");
const failArrayProtocol = require("./AAR064/fail-array-protocol");
const failEmptyObjectArray = require("./AAR064/fail-empty-object-array");
const failMixed = require("./AAR064/fail-mixed");

describe("AAR064: server protocol must be kafka or kafka-ssl (AsyncAPI 2.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR064");
  });

  const run = async (doc) => {
    const results = await linter.run(doc);
    return results.filter((r) => r.code === "asa:AAR064");
  };

  describe("compliant / skipped documents (zero issues)", () => {
    test("passes when servers use kafka and kafka-ssl", async () => {
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
      expect(await run(okEmptyServers)).toHaveLength(0);
    });

    test("does not resolve a $ref server (resolved: false)", async () => {
      expect(await run(okRefServer)).toHaveLength(0);
    });
  });

  describe("non-compliant documents", () => {
    test("reports a server using a non-Kafka protocol", async () => {
      expect(await run(failExample)).toHaveLength(1);
    });

    test("reports case variants (matching is case-sensitive)", async () => {
      expect(await run(failWrongCase)).toHaveLength(3);
    });

    test("reports whitespace-only and padded protocols", async () => {
      expect(await run(failWhitespace)).toHaveLength(2);
    });

    test("reports non-string scalar protocols (number / boolean)", async () => {
      expect(await run(failNumeric)).toHaveLength(3);
    });

    test("reports an object protocol", async () => {
      expect(await run(failObjectProtocol)).toHaveLength(1);
    });

    test("reports a single-element array protocol (coercion-trap regression)", async () => {
      expect(await run(failArrayProtocol)).toHaveLength(1);
    });

    test("reports empty object and empty array protocols", async () => {
      expect(await run(failEmptyObjectArray)).toHaveLength(2);
    });

    test("reports each non-compliant server independently", async () => {
      expect(await run(failMixed)).toHaveLength(2);
    });
  });

  describe("issue shape", () => {
    test("anchors the issue at the server's protocol and carries the AAR064 code / message", async () => {
      const results = await run(failExample);
      expect(results).toHaveLength(1);
      expect(results[0].code).toBe("asa:AAR064");
      expect(results[0].path).toEqual(["servers", "production", "protocol"]);
      expect(results[0].message).toMatch(/^AAR064:/);
    });
  });
});
