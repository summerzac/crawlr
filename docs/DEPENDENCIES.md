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

## Licence check exceptions

None.

## Known audit findings (transitive, not direct)

Recorded at the gate, not fixed by the builder alone. See the Prompt 0 gate report.
