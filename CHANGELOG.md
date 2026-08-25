
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [1.1.0] - 2026-08-25

### Added

- AAR060 - ContentTypeAvro: A message's `contentType` (and the document-level `defaultContentType`) must match `application/*+avro` so Confluent's KafkaAvroDeserializer can deserialize the payload.
- AAR061 - ProcessorFunctionNamePaired: Every `x-scs-function-name` must be paired one-to-one between a producing (`publish`/`send`) and a consuming (`subscribe`/`receive`) operation, so the JAPI generator links them into a single processor.
- AAR062 - SubscribeGroupRequired: Each consuming operation (v2 `subscribe`, v3 `action: receive`) must declare a consumer group via `x-scs-group` or `bindings.kafka.groupId`, so the messaging platform can bind it to a durable, load-balanced consumer group.
- AAR063 - AsyncAPIVersionAllowed: The root `asyncapi` version must be one of the versions allowed by the organization. The allow-list is configurable via the `allowedVersions` option (comma-separated); default `2.6.0`.
- AAR064 - KafkaProtocolRequired: In the Kafka context, each server protocol must be `kafka` or `kafka-ssl`; other protocols such as `https` or `wss` are not permitted. Servers defined under `components.servers` are validated as well.
- AAR050 - InfoTitleRequired: The `info.title` field must exist and not be empty.
- AAR051 - OperationIdCamelCase: Validates that every operation's `operationId` is present and follows camelCase naming convention.
- AAR052 - AvroNamespacePattern: Validates that the namespace of a named Avro schema (`record`, `enum` or `fixed`) is present and follows the corporate pattern (`org.madrid.<cod_poaps>.<classification>.<domain>` or `org.madrid.common.<domain>`).
- AAR053 - ChannelNamingConvention: Validates that the channel/topic name follows the corporate Kafka-topic naming pattern (`<cod_poaps>.<classification>.<domain>.<origin>.<scope>[.<version>]`).
- AAR054 - ClassificationValidValues: Validates that the channel/topic name's classification segment (2nd segment) is `cdc`, `cmd` or `sys`.
- AAR055 - XPayloadReferencesWellFormed: Validates that the `x-payload-references` extension, wherever it appears, contains `subject`, `ref` and `referenceName` on every item.
- AAR056 - AvroSchemaFormat: When the payload uses Avro, `schemaFormat` must be exactly `application/vnd.apache.avro;version=1.9.0`.
- AAR057 - ErrorTopicDocumented: At least one channel must be documented as an error topic following `<topicOriginal>.[<consumerGroup>.]error.<n>`.
- AAR058 - RetryTopicNamingConvention: If a channel name contains `.retry.`, it must follow `<topicOriginal>.<consumerGroup>.retry.<n>`.
- AAR059 - AvroRecordNameCamelCase: The `name` field of every Avro record (including records nested inside `fields[].type`, unions, arrays and maps) must be in CamelCase with an uppercase first letter.
- Unit tests for AAR032, AAR033 and AAR034, each with `fail`/`ok` examples.
- `asa-numeric-format` custom function backing AAR034.

### Changed

- Corrected rule descriptions so they describe what each rule actually validates:
  - AAR001: "HTTPS protocol is mandatory" to "Servers must use a secure protocol" (the rule also accepts `wss`, `amqps`, etc.).
  - AAR012: dropped the misleading "unique" (uniqueness is AAR013's concern; AAR012 only requires the `operationId` to be present).
  - AAR032 / AAR033: "parameters" to "properties", and the restriction list widened to the full set the functions actually accept (`enum`, `const`, `format`).
- AAR032 / AAR033 / AAR034 `given` now also covers AsyncAPI 3 message payloads (`channels[*].messages[*].payload`) and `components.messages[*].payload`, with `resolved: false` so a schema shared via `$ref` is reported once at its definition.

### Fixed

- **AAR034 (NumericFormat)** never reported anything: its `given` applied a `[?(@.type === ...)]` filter immediately after `..properties[*]`, which Spectral's JSONPath resolves to zero nodes. Rewritten as the `asa-numeric-format` custom function that checks the property `type` internally.


## [1.1.0-beta-2] - 2026-08-19

### Added

- AAR060 - ContentTypeAvro: A message's `contentType` (and the document-level `defaultContentType`) must match `application/*+avro` so Confluent's KafkaAvroDeserializer can deserialize the payload.
- AAR061 - ProcessorFunctionNamePaired: Every `x-scs-function-name` must be paired one-to-one between a producing (`publish`/`send`) and a consuming (`subscribe`/`receive`) operation, so the JAPI generator links them into a single processor.
- AAR062 - SubscribeGroupRequired: Each consuming operation (v2 `subscribe`, v3 `action: receive`) must declare a consumer group via `x-scs-group` or `bindings.kafka.groupId`, so the messaging platform can bind it to a durable, load-balanced consumer group.
- AAR063 - AsyncAPIVersionAllowed: The root `asyncapi` version must be one of the versions allowed by the organization. The allow-list is configurable via the `allowedVersions` option (comma-separated); default `2.6.0`.
- AAR064 - KafkaProtocolRequired: In the Kafka context, each server protocol must be `kafka` or `kafka-ssl`; other protocols such as `https` or `wss` are not permitted. Servers defined under `components.servers` are validated as well.

## [1.1.0-beta.1] - 2026-07-15

### Added

- AAR050 - InfoTitleRequired: The `info.title` field must exist and not be empty.
- AAR051 - OperationIdCamelCase: Validates that every operation's `operationId` is present and follows camelCase naming convention.
- AAR052 - AvroNamespacePattern: Validates that the namespace of a named Avro schema (`record`, `enum` or `fixed`) is present and follows the corporate pattern (`org.madrid.<cod_poaps>.<classification>.<domain>` or `org.madrid.common.<domain>`).
- AAR053 - ChannelNamingConvention: Validates that the channel/topic name follows the corporate Kafka-topic naming pattern (`<cod_poaps>.<classification>.<domain>.<origin>.<scope>[.<version>]`).
- AAR054 - ClassificationValidValues: Validates that the channel/topic name's classification segment (2nd segment) is `cdc`, `cmd` or `sys`.
- AAR055 - XPayloadReferencesWellFormed: Validates that the `x-payload-references` extension, wherever it appears, contains `subject`, `ref` and `referenceName` on every item.
- AAR056 - AvroSchemaFormat: When the payload uses Avro, `schemaFormat` must be exactly `application/vnd.apache.avro;version=1.9.0`.
- AAR057 - ErrorTopicDocumented: At least one channel must be documented as an error topic following `<topicOriginal>.[<consumerGroup>.]error.<n>`.
- AAR058 - RetryTopicNamingConvention: If a channel name contains `.retry.`, it must follow `<topicOriginal>.<consumerGroup>.retry.<n>`.
- AAR059 - AvroRecordNameCamelCase: The `name` field of every Avro record (including records nested inside `fields[].type`, unions, arrays and maps) must be in CamelCase with an uppercase first letter.
- Unit tests for AAR032, AAR033 and AAR034, each with `fail`/`ok` examples.
- `asa-numeric-format` custom function backing AAR034.

### Changed

- Corrected rule descriptions so they describe what each rule actually validates:
  - AAR001: "HTTPS protocol is mandatory" to "Servers must use a secure protocol" (the rule also accepts `wss`, `amqps`, etc.).
  - AAR012: dropped the misleading "unique" (uniqueness is AAR013's concern; AAR012 only requires the `operationId` to be present).
  - AAR032 / AAR033: "parameters" to "properties", and the restriction list widened to the full set the functions actually accept (`enum`, `const`, `format`).
- AAR032 / AAR033 / AAR034 `given` now also covers AsyncAPI 3 message payloads (`channels[*].messages[*].payload`) and `components.messages[*].payload`, with `resolved: false` so a schema shared via `$ref` is reported once at its definition.

### Fixed

- **AAR034 (NumericFormat)** never reported anything: its `given` applied a `[?(@.type === ...)]` filter immediately after `..properties[*]`, which Spectral's JSONPath resolves to zero nodes. Rewritten as the `asa-numeric-format` custom function that checks the property `type` internally.

## [1.0.0] - 2025-12-29

### Added

New rules added

- AAR001 - MandatoryHttpsProtocol
- AAR008 - DefinedServer
- AAR009 - DeclaredTag
- AAR010 - DocumentedTag
- AAR011 - DefinedLicense
- AAR012 - DeclaredOperationID
- AAR013 - DuplicateOperationID
- AAR015 - UndefinedContact
- AAR016 - ContactProperties
- AAR017 - UndefinedUrlLicense
- AAR018 - SecuritySchemas
- AAR040 - DefinedChannelServers
- AAR043 - SecurityChannel
- AAR041 - ComponetChannelServer
