const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR064/fail-example");

describe("AAR064: server protocol must be kafka or kafka-ssl (AsyncAPI 3.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR064");
  });

  test("Should report a violation when a server uses a non-Kafka protocol", async () => {
    const results = await linter.run(failExample);
    expect(results.length).toBe(1);
    results.forEach((r) => expect(r.code).toBe("asa:AAR064"));
  });

  test("Should pass when the server uses kafka-ssl", async () => {
    const results = await linter.run({
      asyncapi: "3.0.0",
      info: { version: "1.0.0", title: "OK v3" },
      servers: { production: { host: "broker.example.com", protocol: "kafka-ssl" } },
      channels: {
        userEvents: {
          address: "user-events",
          messages: { Event: { payload: { type: "object" } } },
        },
      },
    });
    expect(results.length).toBe(0);
  });
});
