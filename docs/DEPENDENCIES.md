# Dependency register

Direct dependencies only. Every add, upgrade or removal changes this file in the same commit
(WORKING-RULES.md). "Why" states why nothing already present would do (D-16). The commit column
holds the short hash and subject of the adding commit (hash back-filled in a follow-up docs commit,
since a commit cannot contain its own hash).

Licence policy and allowlist: [SECURITY.md](SECURITY.md#5-dependencies).

## Production dependencies

| Name | Version | Purpose | Licence | Why | Date added | Commit |
|---|---|---|---|---|---|---|
| expo | 57.0.28 | Expo SDK runtime and CLI; the app framework (Expo SDK 57, pinned exact) | MIT | The chosen app platform; cloud iOS builds without a Mac need Expo (EAS) | 2026-10-14 | 787989e build: scaffold Expo app (blank TypeScript template) |
| expo-status-bar | 57.0.1 | Status bar styling component from the Expo SDK | MIT | Ships with the blank template; the only status-bar API that is Expo-Go-safe | 2026-10-14 | 787989e build: scaffold Expo app (blank TypeScript template) |
| react | 19.2.3 | UI library React Native is built on | MIT | Required peer of react-native | 2026-10-14 | 787989e build: scaffold Expo app (blank TypeScript template) |
| react-native | 0.86.3 | Native UI runtime for iOS | MIT | Required by Expo; the native layer | 2026-10-14 | 787989e build: scaffold Expo app (blank TypeScript template) |

## Development dependencies

| Name | Version | Purpose | Licence | Why | Date added | Commit |
|---|---|---|---|---|---|---|
| @types/react | 19.2.18 | TypeScript types for React | MIT | Strict TypeScript needs React's types; not bundled with react | 2026-10-14 | 787989e build: scaffold Expo app (blank TypeScript template) |
| typescript | 6.0.3 | Type checker (`npm run typecheck`) | Apache-2.0 | The language choice; nothing else type-checks TS | 2026-10-14 | 787989e build: scaffold Expo app (blank TypeScript template) |
| jest | 29.7.0 | Unit test runner (`npm test`) | MIT | No test runner present; Expo's supported runner | 2026-10-14 | dc7a057 feat: add placeholder screen with unit test |
| jest-expo | 57.0.6 | Jest preset that transforms Expo/React Native modules for tests | MIT | Plain jest cannot load React Native or Expo modules; this is Expo's own preset, version-matched to SDK 57 | 2026-10-14 | dc7a057 feat: add placeholder screen with unit test |
| @types/jest | 29.5.14 | TypeScript types for jest globals (`describe`, `it`, `expect`) | MIT | Strict typecheck fails on test files without them | 2026-10-14 | dc7a057 feat: add placeholder screen with unit test |
| @testing-library/react-native | 14.1.0 | Renders React Native components in tests and queries by text | MIT | `react-test-renderer` is deprecated for React 19; this is the maintained way to render RN components in jest | 2026-10-14 | dc7a057 feat: add placeholder screen with unit test |
| eslint | 9.39.5 | Linter (`npm run lint`, via `expo lint`) | MIT | No linter present; `expo lint` requires ESLint | 2026-10-14 | 83c4c10 build: add ESLint via expo lint |
| eslint-config-expo | 57.0.2 | Expo's ESLint rule set for React Native + TypeScript | MIT | Avoids hand-maintaining parser and plugin config; version-matched to SDK 57 | 2026-10-14 | 83c4c10 build: add ESLint via expo lint |

## Licence check exceptions

**Granted by the owner at the Prompt 0 gate (D-24, 2026-10-14):** per-package exceptions for the
14 packages below, in the `EXCEPTIONS` map of `scripts/check-licenses.mjs`. The allowlist is
unchanged. Each exception is keyed on the package name **and** the exact licence string, so a
licence change on any of them fails the check again. All arrive as transitive dependencies of
`expo` (Expo CLI, Metro, browserslist, js-yaml); none is Crawlr's own code.

| Package | Version | Licence | Reached via | Reason |
|---|---|---|---|---|
| lightningcss | 1.33.0 | MPL-2.0 | expo → @expo/cli / Metro CSS tooling | build tooling/data, not shipped in app bundle |
| lightningcss-android-arm64 | 1.33.0 | MPL-2.0 | lightningcss (platform binary) | build tooling/data, not shipped in app bundle |
| lightningcss-darwin-arm64 | 1.33.0 | MPL-2.0 | lightningcss (platform binary) | build tooling/data, not shipped in app bundle |
| lightningcss-darwin-x64 | 1.33.0 | MPL-2.0 | lightningcss (platform binary) | build tooling/data, not shipped in app bundle |
| lightningcss-freebsd-x64 | 1.33.0 | MPL-2.0 | lightningcss (platform binary) | build tooling/data, not shipped in app bundle |
| lightningcss-linux-arm-gnueabihf | 1.33.0 | MPL-2.0 | lightningcss (platform binary) | build tooling/data, not shipped in app bundle |
| lightningcss-linux-arm64-gnu | 1.33.0 | MPL-2.0 | lightningcss (platform binary) | build tooling/data, not shipped in app bundle |
| lightningcss-linux-arm64-musl | 1.33.0 | MPL-2.0 | lightningcss (platform binary) | build tooling/data, not shipped in app bundle |
| lightningcss-linux-x64-gnu | 1.33.0 | MPL-2.0 | lightningcss (platform binary) | build tooling/data, not shipped in app bundle |
| lightningcss-linux-x64-musl | 1.33.0 | MPL-2.0 | lightningcss (platform binary) | build tooling/data, not shipped in app bundle |
| lightningcss-win32-arm64-msvc | 1.33.0 | MPL-2.0 | lightningcss (platform binary) | build tooling/data, not shipped in app bundle |
| lightningcss-win32-x64-msvc | 1.33.0 | MPL-2.0 | lightningcss (platform binary) | build tooling/data, not shipped in app bundle |
| caniuse-lite | 1.0.30001816 | CC-BY-4.0 | expo → browserslist | build tooling/data, not shipped in app bundle |
| argparse | 2.0.1 | Python-2.0 | expo → js-yaml | build tooling/data, not shipped in app bundle |

Notes kept from the gate: MPL-2.0 is a weak copyleft on the library's own files only, and
unmodified use does not affect Crawlr's licence; caniuse-lite is a data file whose CC-BY
attribution applies to the data, not to Crawlr; argparse's Python-2.0 is permissive under a
non-allowlisted name.

## Known audit findings (transitive, not direct)

Accepted by the owner at the Prompt 0 gate (D-25): counts, advisories, why each is build-time
only, and the rule for future gates are in [SECURITY.md §5.1](SECURITY.md#51-accepted-risks-d-25).
