const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR064/fail-example");
const okExample = require("./AAR064/ok-example");

describe("AAR064: server protocol must be kafka or kafka-ssl (AsyncAPI 2.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR064");
  });

  test("Should report a violation when a server uses a non-Kafka protocol", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(1);
    results.forEach((r) => expect(r.code).toBe("asa:AAR064"));
  });

  test("Should pass when servers use kafka and kafka-ssl", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });

  test("Should not report when a server has no protocol field", async () => {
    const results = await linter.run({
      asyncapi: "2.4.0",
      info: { version: "1.0.0", title: "No protocol" },
      servers: { production: { url: "broker.example.com:9092" } },
      channels: { "user-events": {} },
    });
    expect(results.length).toBe(0);
  });

  test("Should report a non-scalar protocol (single-element array must not slip through)", async () => {
    const results = await linter.run({
      asyncapi: "2.4.0",
      info: { version: "1.0.0", title: "Array protocol" },
      servers: { production: { url: "broker:9092", protocol: ["kafka"] } },
      channels: { "user-events": {} },
    });
    expect(results.length).toBe(1);
    results.forEach((r) => expect(r.code).toBe("asa:AAR064"));
  });

  test("Should report each non-compliant server independently", async () => {
    const results = await linter.run({
      asyncapi: "2.4.0",
      info: { version: "1.0.0", title: "Mixed servers" },
      servers: {
        a: { url: "a", protocol: "https" },
        b: { url: "b", protocol: "amqp" },
        c: { url: "c", protocol: "kafka" },
      },
      channels: { "user-events": {} },
    });
    expect(results.length).toBe(2);
    results.forEach((r) => expect(r.code).toBe("asa:AAR064"));
  });
});
