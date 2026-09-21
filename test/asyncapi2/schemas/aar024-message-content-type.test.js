const { linterForRule } = require("../../helpers/utils");
const okExample = require("./AAR024/ok-example");
const failExample = require("./AAR024/fail-example");
const okAvroExample = require("./AAR024/ok-avro-example");
const okNonStringExample = require("./AAR024/ok-non-string-example");
const failOneofExample = require("./AAR024/fail-oneof-example");
const okGuardsExample = require("./AAR024/ok-guards-example");
const failVariantsExample = require("./AAR024/fail-variants-example");
const failComponentsOneofExample = require("./AAR024/fail-components-oneof-example");
const okComponentsOneofExample = require("./AAR024/ok-components-oneof-example");
const okTraitsExample = require("./AAR024/ok-traits-example");
const failTraitsExample = require("./AAR024/fail-traits-example");
const failComponentsChannelExample = require("./AAR024/fail-components-channel-example");

describe("AAR024: each message must declare a contentType unless Avro (AsyncAPI 2.x)", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR024");
  });

  const only = (results) => results.filter((r) => r.code === "asa:AAR024");

  test("passes when channel and component messages declare a contentType", async () => {
    const results = only(await linter.run(okExample));
    expect(results.length).toBe(0);
  });

  test("flags channel and component messages that omit contentType", async () => {
    const results = only(await linter.run(failExample));
    expect(results.length).toBe(2);
    results.forEach((r) => expect(r.code).toBe("asa:AAR024"));
  });

  test("exempts an Avro message (schemaFormat) that omits contentType", async () => {
    const results = only(await linter.run(okAvroExample));
    expect(results.length).toBe(0);
  });

  test("treats a present non-string contentType as declared", async () => {
    const results = only(await linter.run(okNonStringExample));
    expect(results.length).toBe(0);
  });

  test("flags only the oneOf member that omits contentType", async () => {
    const results = only(await linter.run(failOneofExample));
    expect(results.length).toBe(1);
  });

  test("passes on structural guards and present-but-non-string contentTypes", async () => {
    const results = only(await linter.run(okGuardsExample));
    expect(results.length).toBe(0);
  });

  test("flags empty message, null contentType, non-Avro schemaFormat and headers-only message", async () => {
    const results = only(await linter.run(failVariantsExample));
    expect(results.length).toBe(4);
    results.forEach((r) => expect(r.code).toBe("asa:AAR024"));
  });

  test("descends a components.messages oneOf and flags only the member that omits contentType", async () => {
    const results = only(await linter.run(failComponentsOneofExample));
    expect(results.length).toBe(1);
    expect(results[0].path).toEqual([
      "components",
      "messages",
      "OrderMsg",
      "oneOf",
      "1",
    ]);
  });

  test("passes when every member of a components.messages oneOf declares a contentType", async () => {
    const results = only(await linter.run(okComponentsOneofExample));
    expect(results.length).toBe(0);
  });

  test("accepts a contentType inherited from message traits", async () => {
    const results = only(await linter.run(okTraitsExample));
    expect(results.length).toBe(0);
  });

  test("flags messages whose traits never leave a contentType declared", async () => {
    const results = only(await linter.run(failTraitsExample));
    expect(results.length).toBe(9);
    results.forEach((r) => expect(r.code).toBe("asa:AAR024"));
  });

  test("flags a message defined under components.channels", async () => {
    const results = only(await linter.run(failComponentsChannelExample));
    expect(results.length).toBe(1);
    expect(results[0].path).toEqual([
      "components",
      "channels",
      "orders",
      "subscribe",
      "message",
    ]);
  });

  test("returns no results for a non-object document", async () => {
    const results = only(await linter.run("42"));
    expect(results.length).toBe(0);
  });

  test("treats a non-string asyncapi version as v2 (version-detection guard)", async () => {
    const results = only(
      await linter.run({
        asyncapi: 2.6,
        info: { title: "Non-string version", version: "1.0.0" },
        channels: {
          orders: { subscribe: { message: { payload: { type: "object" } } } },
        },
      })
    );
    expect(results.length).toBe(1);
  });
});
