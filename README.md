# autark-api-facts

Canonical, dependency-free source of truth for **customer-facing** Autark API facts:
base URL, model/mode names, pricing tiers, rate limits, error codes, custom
headers, endpoints, audio models, and chat parameters.

Both the marketing site (`autark-ai`) and the dashboard (`autark-api`) consume
this package so those surfaces can never drift apart. Internal/authoritative
sources are referenced in the code comments (e.g. `router/modes.py`,
`metering/logger.py`).

## Install

```bash
npm install github:apasilacyans/autark-api-facts
```

## Usage

```ts
import { BASE_URL, PRICING_TIERS, ERROR_CODES } from "autark-api-facts";
```

## Develop

```bash
npm install
npm run build   # emits dist/ (committed so git-dependency installs need no build)
```

When you change `src/index.ts`, run `npm run build`, commit `dist/`, and push.
Consumers pick up the change on their next `npm install`.
