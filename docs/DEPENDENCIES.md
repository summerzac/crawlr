# Dependency register

Direct dependencies only. Every add, upgrade or removal changes this file in the same commit
(WORKING-RULES.md). "Why" states why nothing already present would do (D-16). The commit column
holds the subject of the adding commit; hashes are recorded in the gate report and back-filled
here once known.

Licence policy and allowlist: [SECURITY.md](SECURITY.md#5-dependencies).

## Production dependencies

| Name | Version | Purpose | Licence | Why | Date added | Commit |
|---|---|---|---|---|---|---|
| expo | 57.0.28 | Expo SDK runtime and CLI; the app framework (Expo SDK 57, pinned exact) | MIT | The chosen app platform; cloud iOS builds without a Mac need Expo (EAS) | 2026-10-14 | build: scaffold Expo app (blank TypeScript template) |
| expo-status-bar | 57.0.1 | Status bar styling component from the Expo SDK | MIT | Ships with the blank template; the only status-bar API that is Expo-Go-safe | 2026-10-14 | build: scaffold Expo app (blank TypeScript template) |
| react | 19.2.3 | UI library React Native is built on | MIT | Required peer of react-native | 2026-10-14 | build: scaffold Expo app (blank TypeScript template) |
| react-native | 0.86.3 | Native UI runtime for iOS | MIT | Required by Expo; the native layer | 2026-10-14 | build: scaffold Expo app (blank TypeScript template) |

## Development dependencies

| Name | Version | Purpose | Licence | Why | Date added | Commit |
|---|---|---|---|---|---|---|
| @types/react | 19.2.18 | TypeScript types for React | MIT | Strict TypeScript needs React's types; not bundled with react | 2026-10-14 | build: scaffold Expo app (blank TypeScript template) |
| typescript | 6.0.3 | Type checker (`npm run typecheck`) | Apache-2.0 | The language choice; nothing else type-checks TS | 2026-10-14 | build: scaffold Expo app (blank TypeScript template) |
| jest | 29.7.0 | Unit test runner (`npm test`) | MIT | No test runner present; Expo's supported runner | 2026-10-14 | feat: add placeholder screen with unit test |
| jest-expo | 57.0.6 | Jest preset that transforms Expo/React Native modules for tests | MIT | Plain jest cannot load React Native or Expo modules; this is Expo's own preset, version-matched to SDK 57 | 2026-10-14 | feat: add placeholder screen with unit test |
| @types/jest | 29.5.14 | TypeScript types for jest globals (`describe`, `it`, `expect`) | MIT | Strict typecheck fails on test files without them | 2026-10-14 | feat: add placeholder screen with unit test |
| @testing-library/react-native | 14.1.0 | Renders React Native components in tests and queries by text | MIT | `react-test-renderer` is deprecated for React 19; this is the maintained way to render RN components in jest | 2026-10-14 | feat: add placeholder screen with unit test |
| eslint | 9.39.5 | Linter (`npm run lint`, via `expo lint`) | MIT | No linter present; `expo lint` requires ESLint | 2026-10-14 | build: add ESLint via expo lint |
| eslint-config-expo | 57.0.2 | Expo's ESLint rule set for React Native + TypeScript | MIT | Avoids hand-maintaining parser and plugin config; version-matched to SDK 57 | 2026-10-14 | build: add ESLint via expo lint |

## Licence check exceptions

None.

## Known audit findings (transitive, not direct)

Recorded at the gate, not fixed by the builder alone. See the Prompt 0 gate report.
