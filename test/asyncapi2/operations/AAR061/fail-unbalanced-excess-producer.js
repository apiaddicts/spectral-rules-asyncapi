module.exports = {
  asyncapi: "2.6.0",
  info: { version: "1.0.0", title: "Processor Function Name Paired - Unbalanced Excess Producer" },
  channels: {
    p1: { publish: { operationId: "p1", "x-scs-function-name": "proc" } },
    p2: { publish: { operationId: "p2", "x-scs-function-name": "proc" } },
    c1: { subscribe: { operationId: "c1", "x-scs-function-name": "proc" } },
  },
};
