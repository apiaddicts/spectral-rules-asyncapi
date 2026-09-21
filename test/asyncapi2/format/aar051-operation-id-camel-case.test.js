const { linterForRule } = require("../../helpers/utils");
const failExample = require("./AAR051/fail-example");
const okExample = require("./AAR051/ok-example");
const failComponentsChannels = require("./AAR051/fail-components-channels");
const failCallbacks = require("./AAR051/fail-callbacks");
const okStructuralEdges = require("./AAR051/ok-structural-edges");
const okNoChannels = require("./AAR051/ok-no-channels");

const pathsOf = (results) => results.map((r) => r.path.join(".")).sort();

describe("AAR051 (AsyncAPI 2.x): operationId must be present and in camelCase", () => {
  let linter;

  beforeAll(async () => {
    linter = await linterForRule("asa:AAR051");
  });

  test("Should report exactly one violation per invalid operationId, each on its own path", async () => {
    const results = await linter.run(failExample);

    expect(pathsOf(results)).toEqual([
      "channels.alert/raised.publish.operationId",
      "channels.audit/logged.publish.operationId",
      "channels.audit/logged.subscribe.operationId",
      "channels.invoice/issued.publish.operationId",
      "channels.invoice/issued.subscribe.operationId",
      "channels.order/cancelled.publish.operationId",
      "channels.order/placed.publish.operationId",
      "channels.order/refunded.publish",
      "channels.pet/created.subscribe",
      "channels.pet/deleted.subscribe.operationId",
      "channels.pet/updated.publish.operationId",
      "channels.shipment/created.publish.operationId",
      "channels.shipment/created.subscribe.operationId",
      "channels.shipment/returned.publish.operationId",
      "channels.shipment/returned.subscribe.operationId",
    ]);
    results.forEach((r) => expect(r.code).toBe("asa:AAR051"));
  });

  test("Should pass when operationId is present and in camelCase", async () => {
    const results = await linter.run(okExample);
    expect(results.length).toBe(0);
  });

  test("Should validate the operations of channels defined under components", async () => {
    const results = await linter.run(failComponentsChannels);

    expect(pathsOf(results)).toEqual([
      "components.channels.petCreated.publish.operationId",
      "components.channels.petCreated.subscribe",
    ]);
    results.forEach((r) => expect(r.code).toBe("asa:AAR051"));
  });

  test("Should validate the operations nested inside channel callbacks", async () => {
    const results = await linter.run(failCallbacks);

    expect(pathsOf(results)).toEqual([
      "channels.payment/requested.callbacks.onPaymentRejected.publish.operationId",
      "channels.payment/requested.callbacks.onPaymentSettled.subscribe",
    ]);
    results.forEach((r) => expect(r.code).toBe("asa:AAR051"));
  });

  test("Should skip null, scalar and empty channels and operations", async () => {
    const results = await linter.run(okStructuralEdges);
    expect(results.length).toBe(0);
  });

  test("Should pass when the document declares no channels", async () => {
    const results = await linter.run(okNoChannels);
    expect(results.length).toBe(0);
  });
});
