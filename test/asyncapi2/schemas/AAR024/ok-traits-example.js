module.exports = {
  asyncapi: "2.6.0",
  info: { title: "Content Type - Declared through traits", version: "1.0.0" },
  channels: {
    inlineTrait: {
      subscribe: {
        message: {
          traits: [{ contentType: "application/json" }],
          payload: { type: "object" },
        },
      },
    },
    referencedTrait: {
      subscribe: {
        message: {
          traits: [{ $ref: "#/components/messageTraits/JsonTrait" }],
          payload: { type: "object" },
        },
      },
    },
    chainedTraitRef: {
      subscribe: {
        message: {
          traits: [{ $ref: "#/components/messageTraits/AliasTrait" }],
          payload: { type: "object" },
        },
      },
    },
    escapedPointerTrait: {
      subscribe: {
        message: {
          traits: [{ $ref: "#/components/messageTraits/json~1trait" }],
          payload: { type: "object" },
        },
      },
    },
    lastTraitDeclares: {
      subscribe: {
        message: {
          traits: [{ contentType: null }, { contentType: "application/json" }],
          payload: { type: "object" },
        },
      },
    },
    ownWinsOverTrait: {
      subscribe: {
        message: {
          contentType: "application/xml",
          traits: [{ contentType: null }],
          payload: { type: "object" },
        },
      },
    },
  },
  components: {
    messageTraits: {
      JsonTrait: { contentType: "application/json" },
      AliasTrait: { $ref: "#/components/messageTraits/JsonTrait" },
      "json/trait": { contentType: "application/json" },
    },
  },
};
