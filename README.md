# APIAddicts AsyncAPI Style Guide - Spectral Ruleset

[![Node.js CI](https://github.com/apiaddicts/apiaddicts-asyncapi-style-guide-spectral/actions/workflows/node.js.yml/badge.svg)](https://github.com/apiaddicts/apiaddicts-asyncapi-style-guide-spectral/actions/workflows/node.js.yml)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%203.0-blue.svg)](LICENSE)

Spectral rules for **AsyncAPI 2.x and 3.x** definitions, managed by [ApiQuality](https://apiquality.io) and provided to the [APIAddicts](https://apiaddicts.org) community.

Based on the SonarQube rules from [sonarasyncapi-rules](https://github.com/apiaddicts/sonarasyncapi-rules) and following the same conventions as [apiaddicts-style-guide-spectral](https://github.com/apiaddicts/apiaddicts-style-guide-spectral) (OpenAPI).

---

## Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- Spectral CLI: `npm install -g @stoplight/spectral-cli`

### Installation

```bash
# Clone the repository
git clone https://github.com/apiaddicts/apiaddicts-asyncapi-style-guide-spectral.git
cd apiaddicts-asyncapi-style-guide-spectral
npm install
```

### Usage

#### Command Line

```bash
# Lint a local AsyncAPI file
spectral lint -r asa-spectral.yaml your-asyncapi.yaml

# Lint using remote ruleset
spectral lint -r https://raw.githubusercontent.com/apiaddicts/apiaddicts-asyncapi-style-guide-spectral/main/asa-spectral.yaml your-asyncapi.yaml
```

#### Spectral Config File

Create a `.spectral.yaml` in your project root:

```yaml
extends:
  - https://raw.githubusercontent.com/apiaddicts/apiaddicts-asyncapi-style-guide-spectral/main/asa-spectral.yaml
```

Then run:

```bash
spectral lint your-asyncapi.yaml
```

#### VSCode Extension

1. Install the [Spectral VSCode extension](https://marketplace.visualstudio.com/items?itemName=stoplight.spectral).
2. Create a `.spectral.yaml` file as shown above.
3. Open any AsyncAPI YAML/JSON file for real-time linting.

---

## Rules Reference

### Security Rules

| Rule | Severity | Description |
|------|----------|-------------|
| **AAR001** | `error` | HTTPS protocol (or equivalent secure protocol) is mandatory for all servers. |
| **AAR008** | `error` | The `servers` section must be defined in the AsyncAPI document. |
| **AAR018** | `warn` | Security schemes must be among allowed types and must be complete (all required fields). |
| **AAR043** | `warn` | Each channel operation should define a security scheme. |

### Operations Rules

| Rule | Severity | Description |
|------|----------|-------------|
| **AAR009** | `error` | Each operation (publish/subscribe) must declare at least one tag. |
| **AAR010** | `warn` | All tags should have a `description` field. |
| **AAR040** | `warn` | Channel servers must reference servers defined in the root `servers` object. |
| **AAR041** | `info` | Servers and channels should be defined in `components` for reusability. |

### Format / Documentation Rules

| Rule | Severity | Description |
|------|----------|-------------|
| **AAR011** | `warn` | License should be documented in `info.license`. |
| **AAR012** | `warn` | Each operation must have a unique `operationId`. |
| **AAR013** | `error` | No two operations may share the same `operationId`. |
| **AAR015** | `warn` | The `info` object must contain a `contact` section. |
| **AAR016** | `warn` | Contact must include `name`, `url`, and `email` fields. |
| **AAR017** | `warn` | The `license` object must have a `url` field. |
| **AAR019** | `warn` | The AsyncAPI document should define a unique `id` field. |
| **AAR021** | `warn` | Each operation must have a `summary` field. |
| **AAR022** | `warn` | Operation `description` must differ from its `summary`. |
| **AAR029** | `warn` | Each channel and operation must have a `description`. |
| **AAR032** | `warn` | Numeric properties must have `minimum`, `maximum`, or `format` restrictions. |
| **AAR033** | `warn` | String properties must have `minLength`, `maxLength`, `pattern`, or `enum` restrictions. |
| **AAR034** | `warn` | Numeric types must specify a valid `format` (int32, int64, float, double). |
| **AAR035** | `info` | Messages should have a `title` field. |
| **AAR036** | `warn` | Descriptions must begin with a capital letter and end with a period. |
| **AAR037** | `warn` | Bindings must specify a `bindingVersion`. |
| **AAR042** | `info` | Messages should have a unique `messageId` identifier. |

### Schema Rules

| Rule | Severity | Description |
|------|----------|-------------|
| **AAR024** | `warn` | Messages must comply with the payload schema (examples validated). |
| **AAR026** | `info` | Message schemas should be defined in `components.messages` and referenced via `$ref`. |
| **AAR031** | `warn` | Message examples must follow the declared payload and headers schemas. |

---

## AsyncAPI Version Support

All rules support **AsyncAPI 2.x** by default. Rules that differ structurally for **AsyncAPI 3.x** have dedicated `-v3` variants that are automatically applied based on the document format. Key differences handled:

- **AsyncAPI 2.x**: Operations are under `channels[*].publish` / `channels[*].subscribe`
- **AsyncAPI 3.x**: Operations are under `operations[*]` (top-level)

---

## Custom Functions

The ruleset includes 9 custom Spectral functions for complex validation logic:

| Function | Used by | Purpose |
|----------|---------|---------|
| `asa-check-security-schemes` | AAR018 | Validates security scheme types and completeness |
| `asa-description-format` | AAR036 | Checks description starts uppercase, ends with period |
| `asa-duplicate-operation-id` | AAR013 | Detects duplicate operationId values across channels |
| `asa-message-examples-validation` | AAR024, AAR031 | Validates message examples against schemas |
| `asa-numeric-parameter-integrity` | AAR032 | Checks numeric properties have constraints |
| `asa-string-parameter-integrity` | AAR033 | Checks string properties have constraints |
| `asa-channel-servers-defined` | AAR040 | Validates channel server references exist |
| `asa-binding-version` | AAR037 | Checks bindings have bindingVersion |
| `asa-message-schemas-in-components` | AAR026 | Recommends $ref usage for message schemas |

---

## Project Structure

```
apiaddicts-asyncapi-style-guide-spectral/
├── .github/workflows/       # CI/CD configuration
├── functions/               # Custom Spectral rule functions
│   ├── asa-binding-version.js
│   ├── asa-channel-servers-defined.js
│   ├── asa-check-security-schemes.js
│   ├── asa-description-format.js
│   ├── asa-duplicate-operation-id.js
│   ├── asa-message-examples-validation.js
│   ├── asa-message-schemas-in-components.js
│   ├── asa-numeric-parameter-integrity.js
│   └── asa-string-parameter-integrity.js
├── test/
│   ├── helpers/utils.js     # Test utilities
│   ├── asyncapi2/           # AsyncAPI 2.x tests
│   │   ├── security/        # Security rule tests
│   │   ├── operations/      # Operations rule tests
│   │   ├── format/          # Format/documentation tests
│   │   └── schemas/         # Schema rule tests
│   └── asyncapi3/           # AsyncAPI 3.x tests
├── asa-spectral.yaml        # Main Spectral ruleset
├── package.json
├── CONTRIBUTING.md
└── README.md
```

---

## Running Tests

```bash
# Run all tests with coverage
npm test

# Run a specific test file
npx jest test/asyncapi2/security/aar001.test.js
```

---

## Mapping to SonarQube Rules

This Spectral ruleset is a direct translation of the [sonarasyncapi-rules](https://github.com/apiaddicts/sonarasyncapi-rules) SonarQube plugin. The mapping is:

| SonarQube Rule | Spectral Rule | SonarQube Type | SonarQube Severity |
|----------------|---------------|----------------|-------------------|
| AAR001 | `asa:AAR001` | VULNERABILITY | CRITICAL |
| AAR008 | `asa:AAR008` | VULNERABILITY | CRITICAL |
| AAR009 | `asa:AAR009` | BUG | BLOCKER |
| AAR010 | `asa:AAR010` | BUG | MAJOR |
| AAR011 | `asa:AAR011` | BUG | MAJOR |
| AAR012 | `asa:AAR012` | BUG | MAJOR |
| AAR013 | `asa:AAR013` | BUG | MAJOR |
| AAR015 | `asa:AAR015` | BUG | MAJOR |
| AAR016 | `asa:AAR016` | BUG | MAJOR |
| AAR017 | `asa:AAR017` | BUG | MAJOR |
| AAR018 | `asa:AAR018` | VULNERABILITY | MAJOR |
| AAR019 | `asa:AAR019` | BUG | MAJOR |
| AAR021 | `asa:AAR021` | BUG | MAJOR |
| AAR022 | `asa:AAR022` | BUG | MAJOR |
| AAR024 | `asa:AAR024` | BUG | MAJOR |
| AAR026 | `asa:AAR026` | BUG | MAJOR |
| AAR029 | `asa:AAR029` | BUG | MAJOR |
| AAR031 | `asa:AAR031` | BUG | MAJOR |
| AAR032 | `asa:AAR032` | BUG | MAJOR |
| AAR033 | `asa:AAR033` | BUG | MAJOR |
| AAR034 | `asa:AAR034` | BUG | MAJOR |
| AAR035 | `asa:AAR035` | BUG | MAJOR |
| AAR036 | `asa:AAR036` | BUG | MAJOR |
| AAR037 | `asa:AAR037` | BUG | MAJOR |
| AAR040 | `asa:AAR040` | BUG | MAJOR |
| AAR041 | `asa:AAR041` | BUG | MAJOR |
| AAR042 | `asa:AAR042` | BUG | MAJOR |
| AAR043 | `asa:AAR043` | VULNERABILITY | MAJOR |

---

## Related Projects

- [apiaddicts-style-guide-spectral](https://github.com/apiaddicts/apiaddicts-style-guide-spectral) - Spectral rules for OpenAPI (OAR rules)
- [sonarasyncapi-rules](https://github.com/apiaddicts/sonarasyncapi-rules) - SonarQube plugin for AsyncAPI (source rules)
- [SonarAPI Rules](https://github.com/apiaddicts/sonarapi-rules) - SonarQube plugin for OpenAPI

---

## License

This project is licensed under the [GPL-3.0 License](LICENSE).

---

## Contributors

Managed by [ApiQuality](https://apiquality.io) for the [APIAddicts](https://apiaddicts.org) community.

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.
