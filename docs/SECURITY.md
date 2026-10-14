# Security constitution

Binding on every commit. Product decisions are in [PRODUCT.md](PRODUCT.md); process rules in
[WORKING-RULES.md](WORKING-RULES.md).

## Principle (D-16)

Keep everything as simple as possible without losing any security. Fewest dependencies and moving
parts. Never remove or weaken a security control for simplicity. When two options are equally
secure, take the simpler.

## 1. No secrets in the repo or the app bundle

- No API keys, tokens, passwords, certificates or private keys are committed, ever. The
  pre-commit hook and CI run a secret scan (gitleaks) and fail closed.
- No spend-capable secret ships inside the app bundle. Anything in the bundle can be extracted.
- `.env*` files are gitignored. Local secrets, if ever needed, live in the developer's user
  profile or in the hosting platform's secret store, never in the repo.

## 2. Google API key protection (D-18)

Two kinds of key, treated differently.

### 2.1 Maps SDK key in the app: a restricted public identifier

The Maps SDK for iOS needs a key at runtime, so one key must be in the app. It is restricted in
the Google Cloud console to:

- **Application restriction:** iOS apps, bundle ID `PLACEHOLDER-OI-9.crawlr` only.
- **API restriction:** Maps SDK for iOS only. It cannot call Places, Routes or anything else.

This key is a public identifier, not a secret. Its exposure cannot cause Google spend because
native mobile map loads are not charged. From Google's pricing page
(<https://developers.google.com/maps/billing-and-pricing/pricing>, read 2026-10-14, page states
"Last updated 2026-10-08 UTC"), the "Maps - loads" Essentials table lists:

> Maps SDK | 6DE1-4D9C-5B67 | Free Usage Cap: Unlimited | (no price at any volume tier)

whereas "Dynamic Maps" (the JavaScript API SKU) has a free cap of 10,000 and then "$7.00" per
1,000. The product category list on the same page names "Maps SDK for Android" and "Maps SDK for
iOS" under Maps. The owner should re-read this page when the key is created, since pricing can
change.

### 2.2 Places and Routes keys: never on the device

- Held only as Cloudflare Worker secrets in a Worker owned by the owner (OI-10).
- The Worker exposes only the exact endpoints Crawlr needs, sends Google field masks for only
  the fields used, enforces a per-IP rate limit and a daily global request cap, and rejects
  anything else.
- Apple App Attest verification on the proxy is required before public launch (OI-12).
- Backstops owned by the owner (OI-2): Google budget alert and per-API daily quota caps.
- Nothing of the proxy is built in Prompt 0.

## 3. No personal data at launch

- No sign-in, no accounts (D-9). No analytics, crash reporting or advertising SDKs.
- Location: the user types A and B. If device location is ever used, it stays on the device and
  is sent to the proxy only as the search coordinates with no identifier attached.
- The proxy keeps no logs that identify a user beyond what Cloudflare retains for abuse control.
  Rate-limit counters are per-IP and short-lived.
- Any change to this section is the owner's decision and needs a privacy notice and solicitor
  review (OI-4) before it ships.

## 4. Google Maps Platform terms obligations

Source: Google Maps Platform Service Specific Terms,
<https://cloud.google.com/maps-platform/terms/maps-service-terms>, read 2026-10-14. The page
lists its current version as last modified **June 10, 2026** (shown as "Previous versions (Last
modified June 10, 2026)"). These are the non-EEA terms; the page states that an EEA billing
address falls under separate EEA terms at
<https://cloud.google.com/terms/maps-platform/eea/maps-service-terms>. The owner's billing
address decides which applies (OI-2); the clauses quoted below should be re-checked against the
EEA version if that is the case.

### 4.1 Caching

General terms, section 3:

> **3. Google ID Caching**
> Customer may cache the Google ID values from the Services that return such field and allow
> caching, in accordance with its Documentation. For example, Customer may cache (a) place_id
> from Places API, Directions API, Geolocation API and Routes API, (b) pano_ID, from Street View
> Static API, and (c) video_ID from Aerial View API.

Places API, section 14:

> **14.3 Caching.** Customer may temporarily cache latitude and longitude values from the
> Places API for up to 30 consecutive calendar days, after which Customer must delete the cached
> latitude and longitude values.

Routes API, section 19:

> **19.3 Caching.** Customer may temporarily cache latitude (lat) and longitude (lng) values
> from the Routes API for up to 30 consecutive calendar days, after which Customer must delete
> the cached latitude and longitude values.

**What this means for Crawlr:** Place IDs may be stored. Lat/lng from Places or Routes may be
held for at most 30 days; Crawlr holds them in memory for the current crawl and does not persist
them. Other Google Maps Content (names, opening hours, ratings, polylines) is not cached beyond
the current session.

### 4.2 Display on a Google map

> **14.1 Use without a Google Map.** Customer may use Google Maps Content from the Places API in
> Customer Applications without a corresponding Google Map.
> **14.2 No use with a non-Google map.** Customer must not use Google Maps Content from the
> Places API in conjunction with a non-Google map.

> **19.1 Use without a Google Map.** Customer may use Google Maps Content from the Routes API in
> Customer Applications without a corresponding Google Map.
> **19.2 No use with a non-Google map.** Customer must not use Google Maps Content from the
> Routes API in conjunction with a non-Google map.

**What this means for Crawlr:** every map in the app is a Google map (D-14). Google content is
never drawn on Apple Maps, OpenStreetMap or any other map. Attribution follows the general
terms, section 2 ("Customer will attribute all the Services in accordance with the
Documentation").

## 5. Dependencies

- Direct dependencies only are registered in [DEPENDENCIES.md](DEPENDENCIES.md): name, version,
  purpose, licence, why nothing present would do, date added, commit.
- Exact versions (`save-exact=true` in `.npmrc`); `package-lock.json` is committed; CI installs
  with `npm ci`.
- New packages are added with `npx expo install` where the package is part of the Expo SDK, so
  versions stay SDK-compatible.
- **Licence allowlist (D-21), production dependencies only:** MIT, ISC, BSD-2-Clause,
  BSD-3-Clause, Apache-2.0, 0BSD, CC0-1.0, Unlicense, BlueOak-1.0.0. CI fails on anything else,
  including unknown. The builder never widens the list; a failing package is listed in
  DEPENDENCIES.md with its licence and reason and raised at the gate.
- Transitive dependencies are not registered. `npm audit` findings of high or critical severity
  are reported at the gate; fixes that bump a direct dependency get a register entry.
- GitHub Actions are pinned to a full commit SHA with the version in a comment.
- Third-party binaries used in CI (gitleaks) are downloaded at a pinned version and verified
  against a pinned SHA-256 before use.

### 5.1 Accepted risks (D-25)

**Owner's ruling at the Prompt 0 gate, 2026-10-14:** the `npm audit` findings below are accepted
for now. No `overrides` are added, and no audit job is added to CI.

**The rule.** Audit counts are reported at every gate, by severity, for the production tree
(`npm audit --omit=dev`) and the whole tree. **Any high or critical finding in code that ships in
the app bundle is a blocker** and stops the gate until it is fixed or the owner rules on it.
Findings in build-time tooling are recorded here and re-checked at each gate.

**Counts on 2026-10-14** (lockfile as of `f5274b8`): production tree 35 findings, 23 high and
12 moderate, 0 critical; whole tree including dev tooling 58 findings, 46 high and 12 moderate,
0 critical. Every one is transitive; the direct packages npm flags (`expo`, `react-native`,
`jest`, `jest-expo`, `@types/jest`) are flagged for what they depend on, and the only fix npm
offers for most is a major downgrade (`expo` 44, `react-native` 0.72), which is not a fix.

| Advisory | Packages reached | Severity | Why it is build-time only |
|---|---|---|---|
| `braces`: stack exhaustion on deeply nested glob patterns | `micromatch`, `metro-file-map`, `metro`, `jest-haste-map`, `jest-message-util`, `@jest/*`, `babel-jest`, `@expo/metro`, `@expo/cli` | high | Glob matching in the Metro bundler and Jest, run on the PC and the EAS builder; the app bundle contains no glob library |
| `node-forge`: RSA PKCS#1 v1.5 signature verification accepts extra nested elements | `@expo/code-signing-certificates`, `@expo/cli` | high | Code-signing tooling in the Expo CLI; the app does not use node-forge, and EAS Update is not used |
| `sprintf-js`: denial of service through unbounded precision specifiers | `argparse`, `js-yaml`, `@istanbuljs/load-nyc-config`, `babel-plugin-istanbul` | moderate | YAML parsing and coverage configuration for the CLI and Jest only |
| `uuid`: missing buffer bounds check in v3/v5/v6 with a caller-supplied buffer | `xcode`, `@expo/config-plugins`, `@expo/config`, `@expo/prebuild-config`, `@expo/inline-modules`, `@expo/local-build-cache-provider` | moderate | Xcode project generation during prebuild on the EAS builder; nothing in the app bundle |
| Jest chain (`jest`, `jest-cli`, `jest-config`, `jest-runtime`, `jest-snapshot`, `expect` and the rest) | dev tooling only | high | The test runner; never part of any build output |

**What the app bundle contains:** Crawlr's own TypeScript, the `react` and `react-native`
runtime, and `expo`'s runtime modules. None of the packages above is among them.

## 6. Who decides what

**The builder decides alone** when a matter is all three of: security-only, cost-neutral,
non-legal. Examples: tightening a hook, pinning a version, adding a CI check, choosing between
two free tools of equal security.

**The owner decides** anything that:

- costs money or could (paid tiers, API usage patterns, accounts, memberships);
- changes product behaviour (what the user sees or how routes are chosen);
- involves legal wording (age gate, terms, privacy notice, licence);
- touches the owner's accounts (Google, Apple, Expo, GitHub, Cloudflare);
- widens the licence allowlist or weakens any control in this document.

The builder may propose any of these with a recommendation and waits for a decision.
