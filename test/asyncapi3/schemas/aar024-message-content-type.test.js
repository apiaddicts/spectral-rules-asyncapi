const { linterForRule } = require("../../helpers/utils");
const okExample = require("./AAR024/ok-example");
const failExample = require("./AAR024/fail-example");
const okAvroExample = require("./AAR024/ok-avro-example");
const failRefExample = require("./AAR024/fail-ref-example");
const okGuardsExample = require("./AAR024/ok-guards-example");
const failVariantsExample = require("./AAR024/fail-variants-example");
const okComponentsOneofExample = require("./AAR024/ok-components-oneof-example");
const okTraitsExample = require("./AAR024/ok-traits-example");
const failTraitsExample = require("./AAR024/fail-traits-example");
const failComponentsChannelExample = require("./AAR024/fail-components-channel-example");

describe("AAR024: each message must declare a contentType unless Avro (AsyncAPI 3.x)", () => {
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

  test("exempts an Avro message (payload schemaFormat) that omits contentType", async () => {
    const results = only(await linter.run(okAvroExample));
    expect(results.length).toBe(0);
  });

  test("counts a $ref message once, at its definition, not at the reference site", async () => {
    const results = only(await linter.run(failRefExample));
    expect(results.length).toBe(1);
    expect(results[0].path).toEqual(["components", "messages", "OrderCreated"]);
  });

  test("passes on structural guards, present-but-non-string, and both Avro placements", async () => {
    const results = only(await linter.run(okGuardsExample));
    expect(results.length).toBe(0);
  });

  test("flags empty message, null contentType, non-Avro schemaFormat and both members of a message-level oneOf", async () => {
    const results = only(await linter.run(failVariantsExample));
    expect(results.length).toBe(5);
    results.forEach((r) => expect(r.code).toBe("asa:AAR024"));
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
    expect(results.length).toBe(5);
    results.forEach((r) => expect(r.code).toBe("asa:AAR024"));
  });

  test("flags a message defined under components.channels", async () => {
    const results = only(await linter.run(failComponentsChannelExample));
    expect(results.length).toBe(1);
    expect(results[0].path).toEqual([
      "components",
      "channels",
      "orders",
      "messages",
      "Order",
    ]);
  });

  test("returns no results for a non-object document", async () => {
    const results = only(await linter.run("42"));
    expect(results.length).toBe(0);
  });
});
