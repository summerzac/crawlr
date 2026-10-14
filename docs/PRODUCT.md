# Crawlr product description

## What Crawlr is

An iPhone-first app that builds a walking pub crawl between a start point A and an end point B.
The user picks how many pubs (N); Crawlr chooses N open pubs along the walking route, in order,
within a user-set distance of the route (slider). If there are more candidates than N, it offers
themed routes: real ale (beta, via Google Text Search), sport on TV (Google
goodForWatchingSports), outdoor seating (Google outdoorSeating), late opening (Google opening
hours). Launch area London only. Data source is Google Maps Platform only (Places API (New) +
Routes API, walking). The in-app map is embedded Google Maps. No sign-in, no accounts. 18+ age
gate on first open, pace-yourself messaging, water-break option. Free, no paid placement.

## Decision register

Decisions are the owner's. The builder cites them by number and never changes them alone.

| # | Decision |
|---|---|
| D-1 | London only at launch. |
| D-2 | Phone app, tested on owner's device before any store submission; no web version first. |
| D-3 | Walking only between pubs. |
| D-4 | Slider for max distance off route. |
| D-5 | Launch themes: real ale, sport on TV, outdoor seating, late opening. |
| D-6 | Superseded by D-11. |
| D-7 | Respect opening hours; skip pubs closed on arrival. |
| D-8 | No paid placement. |
| D-9 | No sign-in or accounts at first launch. |
| D-10 | 18+ age gate, pace-yourself messaging, water-break option; wording to solicitor before launch (OI-4). |
| D-11 | Google Maps Platform is the only data source. |
| D-12 | Theme named "outdoor seating" (Google outdoorSeating). |
| D-13 | Real ale via Google Text Search ("real ale"/"cask ale"), labelled beta. |
| D-14 | Google Maps embedded in the app. |
| D-15 | iPhone first; owner holds Apple Developer Program; testing via TestFlight. |
| D-16 | Simplicity principle: as simple as possible without losing any security; fewest dependencies and moving parts; never weaken a security control for simplicity; equally secure means take the simpler; every new dependency states why nothing present would do. |
| D-17 | Crawlr lives in its own repository at `C:\Users\joshu\Projects\crawlr`, separate from every other project. |
| D-18 | Google key protection, option (b): Maps SDK key in the app as a restricted public identifier; Places and Routes keys only in a Cloudflare Worker proxy. See [SECURITY.md](SECURITY.md). |
| D-19 | Route-building runs on the device. The proxy only forwards Google calls. |
| D-20 | GitHub private repo, free tier; Expo/EAS free tier; no licence file; package marked private and UNLICENSED. |
| D-21 | Dependency licence allowlist (see [SECURITY.md](SECURITY.md#dependencies)) applies to production dependencies only; failing packages are listed in DEPENDENCIES.md and raised at the gate; the builder never widens the allowlist. |
| D-22 | Commit-msg hook enforces the subject line only; body and trailers are free. |
| D-23 | Apple Developer Program already held; no new open item (see D-15). |
| D-24 | Licence exceptions: per-package exceptions for the 14 packages raised at the Prompt 0 gate (lightningcss and its 12 platform binaries, MPL-2.0; caniuse-lite, CC-BY-4.0; argparse, Python-2.0), each keyed on package name and exact licence string so a licence change fails the check again; allowlist unchanged; reason "build tooling/data, not shipped in app bundle" ([DEPENDENCIES.md](DEPENDENCIES.md#licence-check-exceptions)). |
| D-25 | npm audit findings accepted for now: no overrides, no audit job in CI; counts reported at every gate; any high finding in code that ships in the app bundle is a blocker ([SECURITY.md](SECURITY.md#51-accepted-risks-d-25)). |
| D-26 | Google Maps Platform non-EEA terms apply; the billing address will be in the UK. Depends on OI-2's billing address being in the UK ([SECURITY.md](SECURITY.md#4-google-maps-platform-terms-obligations)). |
| D-27 | Stray home repository at `C:\Users\joshu` (OI-11): no action by Claude Code; the owner may delete its `.git`. |
