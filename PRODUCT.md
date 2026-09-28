# Product — sladerose.github.io

Personal portfolio and digital home of Slade Rose. Solution Architect and
Development Lead at Athenium Consulting (KZN, South Africa), specializing in
SAP BTP ecosystems for the energy sector. Personal philosophy: radical
simplicity (37signals-influenced), Ruby on Rails/Hotwire, minimal JS footprint.

## Current sections (existing site, being ported to Astro)

- **`/` (home)** — identity hero + portal tiles to the three sections below,
  plus a `/connect` tile (LinkedIn, GitHub, email).
- **`/build`** (`projects.html`) — auto-generated list of public GitHub repos.
  Previously kept in sync by a Ruby script (`update_projects.rb`) run on a
  daily GitHub Actions cron, fetching top repos for `sladerose` and rewriting
  the tile markup between `<!-- PROJECTS_START -->` / `<!-- PROJECTS_END -->`
  markers. Needs an Astro-native equivalent (build-time fetch).
- **`/lens`** (`lens.html`) — visual log, surfing the KZN coast and trail
  running. Currently placeholder images (picsum.photos); real photos to be
  added later.
- **`/logic`** (`logic.html`) — short-form writing/notes on architecture,
  simplicity, process. Currently 4 static entries; this is the natural seed
  for a future articles/blog section.

## Planned additions

- **Articles / blog.** Not built yet — the reason Sanity CMS is being kept in
  the stack (see below) instead of stripped for being unused. `/logic`'s
  existing entries are the prototype content shape (dated, single-topic,
  short). A real articles feature would likely formalize `/logic` into a
  proper post list + detail pages, authored in Sanity rather than hardcoded
  HTML.

## Non-goals / explicitly out

- No client work, no Athenium branding, no Athenium content of any kind on
  this site — it is Slade's personal site, fully separate from Athenium's
  own marketing site (`AtheniumWebsite` repo) it was technically forked from
  for its Astro/Sanity/Vercel scaffolding.
- No CMS-authored content yet — Sanity is provisioned ahead of need, not
  wired to real content until articles actually start getting written.

## Stack decisions carried over from AtheniumWebsite

Kept: Astro, React islands (`@astrojs/react`), Sanity CMS (own new
project/dataset — never Athenium's `sofrjamf` project), Vercel adapter +
hosting, Vercel Analytics.

Dropped / to be replaced: Athenium's Sanity schema content and dataset,
Athenium page content (`about`, `contact`, `industries`, `services`,
`stories`, `vision`, `case-studies/*`), Athenium images
(`case-study-*.png`, `mining.png`, `logistics.png`, `oil-gas.png`,
`vision-bg.png`).

Hosting: Vercel (not GitHub Pages — superseded that earlier plan once the
Vercel adapter + Sanity were kept). Domain: `sladerose.co.za` (GoDaddy),
to be pointed at Vercel once the site is live.
