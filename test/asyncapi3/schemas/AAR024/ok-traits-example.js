module.exports = {
  asyncapi: "3.0.0",
  info: { title: "Content Type - Declared through traits", version: "1.0.0" },
  channels: {
    inlineTrait: {
      address: "inlineTrait",
      messages: {
        Inline: {
          traits: [{ contentType: "application/json" }],
          payload: { type: "object" },
        },
      },
    },
    referencedTrait: {
      address: "referencedTrait",
      messages: {
        Referenced: {
          traits: [{ $ref: "#/components/messageTraits/JsonTrait" }],
          payload: { type: "object" },
        },
      },
    },
    lastTraitDeclares: {
      address: "lastTraitDeclares",
      messages: {
        Last: {
          traits: [{ contentType: null }, { contentType: "application/json" }],
          payload: { type: "object" },
        },
      },
    },
    ownWinsOverTrait: {
      address: "ownWinsOverTrait",
      messages: {
        Own: {
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
    },
  },
};
