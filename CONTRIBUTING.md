# Contributing to APIAddicts AsyncAPI Style Guide Spectral

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## How to Contribute

1. Fork the repository.
2. Create a feature branch from `develop`.
3. Add your changes with appropriate tests.
4. Ensure all tests pass: `npm test`.
5. Submit a pull request to the `develop` branch.

## Adding a New Rule

1. Add the rule definition in `asa-spectral.yaml` following the existing naming convention (`asa:AAR{number}`).
2. If the rule needs custom logic, create a function in `functions/asa-{name}.js`.
3. Create test fixtures in `test/asyncapi2/{category}/AAR{number}/`.
4. Create a test file in `test/asyncapi2/{category}/aar{number}.test.js`.
5. Update the README with the new rule documentation.

## Code Style

- Use JSDoc comments for all custom functions.
- Follow the existing function signature pattern: `(given, options, context) => []`.
- Return an empty array for passing validations.
- Return descriptive error messages prefixed with the rule code.

## Contributor License Agreement (CLA)

By contributing to this project, you agree to the Contributor License Agreement.
