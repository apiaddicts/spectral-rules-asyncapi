module.exports = {
  asyncapi: "2.6.0",
  info: {
    version: "1.0.0",
    title: "Processor Function Name Paired - Fail Scenarios",
  },
  channels: {
    "a-in": {
      publish: { operationId: "consumeA", "x-scs-function-name": "processAtoB" },
    },
    "b-out": {
      subscribe: { operationId: "produceB", "x-scs-function-name": "processCtoD" },
    },
    "dup-a": {
      publish: { operationId: "dupA", "x-scs-function-name": "processDup" },
    },
    "dup-b": {
      publish: { operationId: "dupB", "x-scs-function-name": "processDup" },
    },
    "paired-in": {
      publish: { operationId: "consumeP", "x-scs-function-name": "processPaired" },
    },
    "paired-out": {
      subscribe: { operationId: "produceP", "x-scs-function-name": "processPaired" },
    },
  },
};
