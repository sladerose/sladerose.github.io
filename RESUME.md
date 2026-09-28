# Resume notes — personal site migration

Read `PRODUCT.md` and `DESIGN.md` first (both written, current, source of truth).

## Where things stand

- Repo moved: `~/Development/sladerose.github.io` → this folder
  (`~/Development/Websites/sladerose.github.io`), still on git branch
  `astro-migration` (branched off `main`, nothing committed yet, working tree
  clean at time of writing).
- `.claude` and `.mcp.json` symlinked to `../.claude` / `../.mcp.json`
  (workspace-shared skill pool + MCP servers). Confirmed present.
- Old repo content still in place, untouched: `index.html`, `lens.html`,
  `logic.html`, `projects.html`, `style.css`, `update_projects.rb`,
  `.github/workflows/update_projects.yml`, `README.md`. Nothing carved in
  from Astro yet.
- Source Astro project lives at `~/Development/AtheniumWebsite` (separate
  clone, untouched, Athenium's real client project — do not edit it, only
  copy from it).

## Decisions already made (don't re-ask)

- Base the new site on the AtheniumWebsite Astro scaffold, keeping:
  Astro core, React islands (`@astrojs/react`), Sanity CMS, Vercel adapter
  + `@vercel/analytics`. Reason given: might write articles one day, wants
  CMS-readiness now rather than bolting it on later.
- Sanity: must use a **new, separate Sanity project/dataset** — never
  Athenium's live `sofrjamf` project/dataset. Sanity CLI is installed
  (`@sanity/cli` 8.13.0 via npx) but **not yet logged in** — needs an
  interactive browser login (`sanity login`) that only the user can do.
- Hosting: **Vercel**, not GitHub Pages (superseded an earlier GitHub Pages
  plan once the Vercel adapter was kept). Vercel CLI already installed and
  authenticated as `sladerose` (`vercel whoami` confirmed).
- Domain `sladerose.co.za` (GoDaddy) — noted, not yet wired up, deliberately
  deferred ("continue with website redesign" first).
- Drop entirely: Athenium's Sanity schema/content, Athenium page content
  (`about`, `contact`, `industries`, `services`, `stories`, `vision`,
  `case-studies/*`), Athenium images (`case-study-*.png`, `mining.png`,
  `logistics.png`, `oil-gas.png`, `vision-bg.png`).
- Existing design (`DESIGN.md`) is source of truth — dark brutalist grid-tile
  system, rose accent `#ff0055`, mono telemetry-style labels, zero-JS-on-
  main-pages posture. Do not let a taste skill override these tokens.

## In progress / interrupted here

Onboarding done this session: `Skill` tool registered `onboard-website-project`
correctly (cwd was inside project folder). 4-question batch answered:
stage = redesign (existing site, actively iterating), style authority =
`DESIGN.md` is source of truth, motion = subtle/minimal, Impeccable =
proactive at natural checkpoints. `CLAUDE.md` written with `## Skill Routing`
section.

Step 2 (Astro carve-in) also done this session. Asked user one extra
question not pre-decided: current site has no persistent navbar/footer (nav
is via grid tiles / back-tile links); AtheniumWebsite source has a fixed
Navbar + Footer. **User chose: adopt persistent Navbar + Footer** (re-skin
content, don't drop them) — this is now a settled decision, don't re-ask.

Copied from `~/Development/AtheniumWebsite`: `src/layouts/Layout.astro`,
`src/components/Navbar.astro`, `src/components/Footer.astro`,
`src/components/SanityStudio.tsx`, `src/styles/global.css`,
`src/pages/admin/[...index].astro`, `sanity.config.ts`, `astro.config.mjs`,
`tsconfig.json`, `package.json` (renamed to `sladerose-github-io`).
Sanity schema: copied only `post.ts` (generic blog seed) + rewrote
`schemaTypes/index.ts` to export just `[post]` — dropped Athenium's
`service.ts`/`successStory.ts` schema types entirely, per decision to drop
Athenium content. `astro.config.mjs` and `sanity.config.ts` both have
`projectId: 'REPLACE_ME'` placeholders with a TODO comment pointing at step 7
below — never left pointing at Athenium's `sofrjamf`. `.gitignore` merged
(`dist/`, `.astro/`, `.vercel`, `.env`, `pnpm-debug.log*` added).
Did **not** copy `public/favicon.png` (Athenium's logo image) or
`package-lock.json` (will regenerate fresh on `npm install`).

Step 3 (re-skin) also done this session. Changes:

- `global.css` rewritten: tokens now match `DESIGN.md` (rose `#ff0055`, not
  Athenium's orange `#FF4C00`), `[data-theme="light"]` block dropped entirely
  (dark-only, no toggle), `@keyframes float`/`pulseGlow` + `.animate-float`
  dropped (continuous loops explicitly banned by `DESIGN.md` Motion
  section), `.reveal`/`.reveal.active` dropped (was IntersectionObserver-
  driven, no longer used), `--color-accent-blue`/`--dot-grid` dropped
  (unused), radius tokens set to `0` (hard edges, `DESIGN.md` says no
  rounded corners) except `--radius-full` (kept for circular status dots),
  noise-overlay `body::before` ported in from the old `style.css`. Kept:
  `.container`/`.section`/`.btn`/`.glass-panel` utilities, scrollbar theming.
  Grid-tile system CSS (`.tile`, `.grid-container`, etc.) deliberately
  **not** moved into `global.css` yet — that's tied to the actual markup
  port, left for step 4.
- `Layout.astro`: dropped the theme-init script and the reveal
  `IntersectionObserver` script entirely (no theme toggle, no scroll-reveal
  in this design). Default `title`/`description` now Slade Rose's own copy
  (matches `index.html`'s meta tags). Favicon now the same inline SVG
  data-URI "S" mark already used across the plain-HTML pages, instead of a
  missing `/favicon.png`. Kept `ClientRouter` and the `fullscreen`-mode style
  block (still needed for step 4's viewport-fill pages).
- `Navbar.astro`: dropped the theme-toggle button/icons/script (dark-only).
  Dropped the `<img src="/favicon.png">` logo, kept text-only
  `SLADE_ROSE /` logo. Links now `/build /lens /logic`. CTA now
  `mailto:sladerose1@gmail.com` (no `/contact` page planned). Kept the
  mobile hamburger toggle script (genuinely needed, no other way to reveal
  the mobile nav) — dropped the old `setupStickyNav` scroll-listener, it
  toggled a `.scrolled` class no CSS rule ever used.
- `Footer.astro`: telemetry text now `SLADE_ROSE // STATUS: NOMINAL` /
  `© {year} SLADE_ROSE`, was Athenium's `ATHENIUM_SYSTEMS` + fake
  version/port numbers.
- `DESIGN.md` updated with a new `## Navigation` section documenting the
  persistent Navbar/Footer decision, the dark-only/no-toggle rule, and the
  `fullscreen` prop pattern for viewport-fill pages — so this doesn't need
  re-deriving next session.

Step 4 (page porting) also done this session. Pages created:
`src/pages/index.astro`, `src/pages/lens.astro`, `src/pages/logic.astro`,
`src/pages/build.astro` (route is `/build`, not `/projects` — matches
`PRODUCT.md`'s section naming, source file was `projects.html`). All four
use `Layout` with `fullscreen` (viewport-fill grids, no page scroll, matches
old behavior). Grid-tile system CSS (`.tile`, `.grid-container`,
`.card-meta`, `.tile-status`, `.project-langs`, `.lang-tag`, `.tile-project`,
`.tile-offline`, responsive breakpoints) moved from the old `style.css` into
`global.css`, token values unchanged (already matched `DESIGN.md`).
Page-specific CSS (`.photo-tile` etc. on `/lens`, `.logic-grid`/`.entry-date`
on `/logic`) kept scoped per-page via Astro `<style>` blocks, same split as
before.

Each page's own inline "back to home" link/tile was **removed** — the
persistent Navbar's logo now covers that, and it was genuinely redundant
chrome once Navbar shipped. `/logic`'s header tile changed from a plain tile
to `.tile-2x1` (spans 2 columns) to keep its 3×2 grid fully flush after
removing the back-tile (5 tiles: one 2x1 + four singles = 6 cells, no gaps).

Two content edits made beyond straight porting, both because "verbatim"
would have shipped something false once the site's actual architecture
changed:
- `/logic`'s "Build It, Then Delete Half" entry no longer claims "no
  JavaScript on the main pages" (that's false now — Navbar's mobile-menu
  script + Astro's view-transitions router ship everywhere). Reworded to
  say the *tile grids* stay pure CSS, only nav chrome carries any JS.
- `/build`'s single sample project tile no longer describes itself as
  "HTML, CSS, and Ruby automation, no JavaScript" (also now false — it's
  Astro/TypeScript/Sanity). Updated tags to `ASTRO`/`TYPESCRIPT`/`SANITY`.
  Kept as a single static tile with a comment marking it for step 5's
  dynamic-fetch replacement — didn't try to build the GitHub-fetch logic
  itself, that's step 5's job, not step 4's.

Also moved Google Fonts loading (Space Mono, Inter) out of a per-page
`@import` in `global.css` and into `<link rel="preconnect">` +
`<link rel="stylesheet">` tags in `Layout.astro`'s `<head>` — matches what
every old HTML page already did individually, just centralized once instead
of duplicated four times.

Ran `npm install` (hit one transient `ECONNRESET`, succeeded on retry) then
`npx astro build` to verify. First build failed:
`projectId can only contain only a-z, 0-9 and dashes` — Sanity's client
rejects `REPLACE_ME` outright even unused. Fixed by changing the placeholder
in both `astro.config.mjs` and `sanity.config.ts` to `'placeholder'`
(same TODO comment, still pointing at step 7, just a different literal that
satisfies Sanity's format check). Second build succeeded clean: all 5 routes
generated (`/`, `/build`, `/lens`, `/logic`, `/admin`). Spot-checked
`dist/index.html` output — correct, no stray Athenium branding (the one
"Athenium Consulting" hit in there is Slade's real, legitimate bio content).
`esbuild`/`sharp` install scripts needed manual approval
(`npm install-scripts approve ...`) — expected, they're native-binary
installers Vite/Astro's image pipeline depend on, not arbitrary
third-party scripts. `package-lock.json` now exists (new, from `npm
install`) and should be committed alongside this step's changes.
Removed `dist/`/`.vercel/` build artifacts after verifying (gitignored
either way, just tidy).

`npm audit` reports 14 vulnerabilities (1 low, 4 moderate, 8 high, 1
critical) in the dependency tree inherited from the AtheniumWebsite
scaffold (Sanity/Astro transitive deps) — not introduced by this session's
changes, not yet triaged. Worth a look before going to production, not
blocking further migration work.

Step 5 (GitHub fetch) also done this session. `src/pages/build.astro`
rewritten: fetches `PINNED_REPOS` (`sladerose.github.io`, `ExternalCAP`,
`Folio`, `LearningRuby`, `FusionAnalyzer`) from the GitHub API at build time,
same pinned-list-filter approach as `update_projects.rb` (order from the
list, not fetch order), fetches each repo's top-3 languages, falls back to
`"Mission critical digital architecture."` when a repo has no description —
all matching the old Ruby script's behavior exactly. `GITHUB_TOKEN` env var
optional (higher rate limit), read via `process.env` — not wired to any CI
secret yet, works unauthenticated for now (GitHub allows 60 unauthed
requests/hour, plenty for 6 calls). One deliberate behavior change: on
total fetch failure (network down, rate-limited) it falls back to a static
single-tile placeholder instead of crashing the whole `astro build` — the
old Ruby script `exit 1`'d on failure, which was fine for a cron job that
just skips a day, but would be worse for a personal-site build pipeline
where a GitHub API hiccup could block *every* deploy. Verified with a real
`astro build` hitting the live GitHub API: only `sladerose.github.io`
currently matched from the 5 pinned names — `ExternalCAP`/`Folio`/
`LearningRuby`/`FusionAnalyzer` don't resolve anymore (renamed, deleted, or
made private since the Ruby script was last run for real — not a bug in the
new code, just stale pinned names). Not fixed — that pinned list is the
user's call, not mine to edit blind.

Deleted `update_projects.rb` and `.github/workflows/update_projects.yml` —
both fully superseded now that the fetch happens at build time on every
deploy. Note: the workflow's other job (daily-midnight cron trigger, so the
list stays fresh even with no pushes) has **no replacement yet** — Astro's
build-time fetch only re-runs when something triggers a new build, and
there's no Vercel project linked yet to attach a scheduled deploy hook to.
Revisit once step 8 (`vercel link`) is done: add a Vercel Cron Job hitting
a deploy hook on the same daily schedule, if the nightly-refresh behavior
still matters once the project's live somewhere real.

## Next steps, in order

1. ~~Redo the onboarding question batch, write `## Skill Routing`~~ — done.
2. ~~Carve the Astro base in from `~/Development/AtheniumWebsite`~~ — done.
3. ~~Re-skin `global.css`/`Layout.astro`/`Navbar.astro`/`Footer.astro`~~ —
   done, see above for exact scope and the one flagged follow-up
   (`logic.html` copy fix, deferred to step 4).
4. ~~Port the four existing pages into Astro~~ — done, see above for exact
   scope, the two content edits, and the `projectId` placeholder-format fix
   that unblocked the build. Verified with a real `astro build`, not just
   by inspection.
5. ~~Replace `update_projects.rb` + its cron with an Astro build-time
   fetch~~ — done, see above for exact scope, the fallback-on-failure
   behavior change, and the still-open daily-refresh-cadence follow-up
   (deferred to step 8).
6. Delete the remaining old plain-HTML/CSS files (`index.html`, `lens.html`,
   `logic.html`, `projects.html`, `style.css`) once the Astro version fully
   replaces them — they're now fully superseded by step 4's pages but still
   present untouched on disk, not yet deleted. (`update_projects.rb` + its
   workflow are already gone, deleted in step 5 above.)
7. `sanity login` (user, interactively) → create new personal Sanity
   project/dataset → wire `astro.config.mjs`'s sanity integration to it
   (not `sofrjamf`).
8. `vercel link` this project, deploy, confirm site live on a Vercel URL
   before touching DNS/domain.
9. Domain (`sladerose.co.za`) wiring — deferred, revisit only when asked.
10. Merge `astro-migration` → `main` once working end-to-end.

## Standing instructions

- Never carry any Athenium client content/branding into this repo.
- Caveman full mode is active for this user's sessions — terse, technical,
  no filler.
