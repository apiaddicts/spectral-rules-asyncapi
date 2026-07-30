
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [Unreleased]

### Added

### Changed

### Removed

### Fixed

### Security

## [1.1.0-beta-1] - 2026-07-15

### Added

- AAR050 - InfoTitleRequired: The `info.title` field must exist and not be empty.
- AAR059 - AvroRecordNameCamelCase: The `name` field of every Avro record (including records nested inside `fields[].type`, unions, arrays and maps) must be in CamelCase with an uppercase first letter.

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