module.exports = {
  asyncapi: "2.6.0",
  info: { title: "Content Type - Traits that declare nothing", version: "1.0.0" },
  channels: {
    traitWithoutContentType: {
      subscribe: {
        message: {
          traits: [{ headers: { type: "object" } }],
          payload: { type: "object" },
        },
      },
    },
    ownNullWinsOverTrait: {
      subscribe: {
        message: {
          contentType: null,
          traits: [{ contentType: "application/json" }],
          payload: { type: "object" },
        },
      },
    },
    lastTraitNullWins: {
      subscribe: {
        message: {
          traits: [{ contentType: "application/json" }, { contentType: null }],
          payload: { type: "object" },
        },
      },
    },
    traitsNotAnArray: {
      subscribe: {
        message: {
          traits: { contentType: "application/json" },
          payload: { type: "object" },
        },
      },
    },
    scalarTraitMember: {
      subscribe: {
        message: {
          traits: ["application/json", null],
          payload: { type: "object" },
        },
      },
    },
    externalTraitRef: {
      subscribe: {
        message: {
          traits: [{ $ref: "https://example.com/traits.yaml#/JsonTrait" }],
          payload: { type: "object" },
        },
      },
    },
    danglingTraitRef: {
      subscribe: {
        message: {
          traits: [{ $ref: "#/components/messageTraits/Missing" }],
          payload: { type: "object" },
        },
      },
    },
    traitRefThroughScalar: {
      subscribe: {
        message: {
          traits: [{ $ref: "#/info/title/nested" }],
          payload: { type: "object" },
        },
      },
    },
    circularTraitRef: {
      subscribe: {
        message: {
          traits: [{ $ref: "#/components/messageTraits/LoopA" }],
          payload: { type: "object" },
        },
      },
    },
  },
  components: {
    messageTraits: {
      LoopA: { $ref: "#/components/messageTraits/LoopB" },
      LoopB: { $ref: "#/components/messageTraits/LoopA" },
    },
  },
};
