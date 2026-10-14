# Design: architecture outline

Outline only. Nothing here beyond the app skeleton exists yet. Every item marked **OPEN** is a
choice not yet made; owner choices are numbered against the decision register in
[PRODUCT.md](PRODUCT.md).

## Components

```
iPhone                                   Cloudflare (owner account, OI-10)        Google Maps Platform
┌──────────────────────────────┐         ┌──────────────────────────────┐         ┌───────────────────┐
│ Crawlr app (Expo / RN / TS)  │         │ Worker proxy (not built yet) │         │ Places API (New)  │
│  - screens                   │  HTTPS  │  - holds Places + Routes keys│  HTTPS  │ Routes API        │
│  - route-building algorithm  │───────▶ │    as Worker secrets         │───────▶ │                   │
│  - embedded Google map       │         │  - fixed endpoints only      │         └───────────────────┘
│    (Maps SDK for iOS, with   │         │  - field masks               │
│    bundle-restricted key)    │         │  - per-IP rate limit         │         ┌───────────────────┐
│                              │         │  - daily global cap          │         │ Maps SDK for iOS  │
│                              │─────────┼──────────────────────────────┼───────▶ │ (map tiles)       │
└──────────────────────────────┘         └──────────────────────────────┘         └───────────────────┘
```

### App

- Expo SDK (version pinned in `package.json` and [DEPENDENCIES.md](DEPENDENCIES.md)), React
  Native, TypeScript strict. iPhone first (D-15). Expo Go for the placeholder stage; EAS
  development builds and TestFlight once native Google Maps is added.
- No sign-in, no accounts, no analytics, no crash reporting at launch (D-9, SECURITY.md).
- Local state only: age-gate acknowledgement and the current crawl. **OPEN**: storage mechanism
  (candidates: `AsyncStorage`-class key-value from the Expo SDK, or React state only with no
  persistence). Decide when the age gate is built.
- **OPEN**: map library. Google Maps is mandated (D-14). Candidates: `react-native-maps` with the
  Google provider, or Google's own `@googlemaps/react-native-navigation-sdk`-family packages.
  Decide at the first map prompt, against the simplicity principle (D-16).

### Backend: Cloudflare Worker proxy (D-18, D-19)

- Purpose: keep the spend-capable Google keys off the device. It forwards Google calls and
  nothing else. No route-building, no storage, no user identity.
- Exposes only the exact endpoints Crawlr needs (expected: one for Places Text Search, one for
  Places Nearby/Details, one for Routes Compute Routes). Any other path returns 404.
- Attaches the Google field mask for each call so only the fields Crawlr uses are requested and
  billed.
- Enforces a per-IP rate limit and a daily global request cap; rejects anything else.
- Apple App Attest verification before public launch (OI-12).
- **OPEN**: whether the Worker also caches Place IDs (allowed indefinitely by Google's terms) to
  reduce repeat lookups. Default: no cache until usage data says it is worth it.
- Not built in Prompt 0. Account is OI-10.

### Where the route-building algorithm runs

On the device (D-19). Inputs: A, B, N, max distance off route, chosen theme. Steps are the
app's own code; the proxy only supplies Google results.

## Data flow for one crawl search

1. User enters A and B, picks N, sets the off-route slider, optionally a theme.
2. App → proxy → Routes API: walking route A→B. Response: polyline + distance + duration.
3. App decomposes the polyline into a corridor of width = slider value.
4. App → proxy → Places API (New): search for pubs within the corridor. **OPEN**: Nearby Search
   along sample points vs Text Search with a location bias; themed searches add the theme query
   or filter (real ale via Text Search "real ale"/"cask ale", D-13; sport on TV via
   `goodForWatchingSports`; outdoor seating via `outdoorSeating`, D-12; late opening via opening
   hours).
5. App filters: open at estimated arrival time (D-7), within corridor, deduplicated by Place ID.
6. App orders candidates along the route and picks N, spacing them along the walk.
   **OPEN**: selection heuristic (even spacing vs rating vs theme strength).
7. If candidates exceed N and a theme is set, the app offers themed alternatives.
8. App → proxy → Routes API: walking route through the chosen pubs in order (waypoints).
9. App renders the route and pubs on the embedded Google map (D-14) with Google attribution.
10. Pace-yourself messaging and water-break option are shown during the crawl (D-10).

Nothing leaves the device except the Google calls via the proxy. No request carries a user
identifier. Place lat/lng from Google is held in memory for the crawl and not persisted beyond
30 days (SECURITY.md quotes the terms).

## Open choices summary

| Choice | Owner or builder | Status |
|---|---|---|
| Map library | Builder proposes, owner decides (product behaviour) | OPEN |
| Local storage mechanism for age gate | Builder (cost-neutral, security-only) | OPEN |
| Places search strategy along the corridor | Builder proposes, owner decides (cost) | OPEN |
| Pub selection heuristic | Owner (product behaviour) | OPEN |
| Proxy Place ID cache | Owner (cost) | OPEN |
| App Attest timing | Owner (OI-12) | OPEN |
