module.exports = {
  asyncapi: "3.0.0",
  info: { title: "Content Type - Traits that declare nothing", version: "1.0.0" },
  channels: {
    traitWithoutContentType: {
      address: "traitWithoutContentType",
      messages: {
        NoTrait: {
          traits: [{ headers: { type: "object" } }],
          payload: { type: "object" },
        },
      },
    },
    ownNullWinsOverTrait: {
      address: "ownNullWinsOverTrait",
      messages: {
        OwnNull: {
          contentType: null,
          traits: [{ contentType: "application/json" }],
          payload: { type: "object" },
        },
      },
    },
    lastTraitNullWins: {
      address: "lastTraitNullWins",
      messages: {
        LastNull: {
          traits: [{ contentType: "application/json" }, { contentType: null }],
          payload: { type: "object" },
        },
      },
    },
    traitsNotAnArray: {
      address: "traitsNotAnArray",
      messages: {
        ScalarTraits: {
          traits: "application/json",
          payload: { type: "object" },
        },
      },
    },
    externalTraitRef: {
      address: "externalTraitRef",
      messages: {
        External: {
          traits: [{ $ref: "https://example.com/traits.yaml#/JsonTrait" }],
          payload: { type: "object" },
        },
      },
    },
  },
};
