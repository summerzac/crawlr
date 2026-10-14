# Open items

Mirror of the owner's open-item list, restricted to the items that touch this repository.
Numbers are the owner's. Wherever a value is needed before the item is closed, the repo uses
`PLACEHOLDER-OI-<n>`. The builder never invents a company name, address, registration number,
domain or contact to fill one.

| # | Item | Owner action | Blocks | Status |
|---|---|---|---|---|
| OI-2 | Google Maps Platform billing account, budget alert and per-API daily quota caps | Create billing account; set monthly cap; set daily quotas on Places API (New) and Routes API | Any Google call (not in Prompt 0) | Open |
| OI-4 | Solicitor review of age-gate, pace-yourself and water-break wording (D-10) and any legal wording in the app or store listing | Engage solicitor; return approved wording | Public launch | Open |
| OI-7 | GitHub repository | Create private repo `crawlr`; give the builder the URL | CI running; pushing | Open |
| OI-8 | Expo account | Create account; EAS project ID | Cloud builds, TestFlight | Open |
| OI-9 | Bundle ID prefix (reverse-DNS) | Decide prefix | Store/TestFlight builds; `app.json` holds `PLACEHOLDER-OI-9.crawlr` | Open |
| OI-10 | Cloudflare account for the Worker proxy (D-18) | Create account | Building the proxy (not in Prompt 0) | Open |
| OI-11 | Stray git repository rooted at `C:\Users\joshu` (the whole user profile) | **Low risk: no remote, no commits; owner may delete `C:\Users\joshu\.git`.** The builder does nothing to `C:\Users\joshu` (D-27). | Nothing in this repo | Open, low risk |
| OI-12 | Apple App Attest on the proxy before public launch | Decide timing; builder implements in a later prompt | Public launch | Open |

## Placeholders in use

| Placeholder | Where | Closes with |
|---|---|---|
| `PLACEHOLDER-OI-9.crawlr` | `app.json` → `expo.ios.bundleIdentifier` | OI-9 |
