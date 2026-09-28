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

Flagged, not yet fixed (content, belongs to step 4 when that page is
ported): `logic.html`'s existing copy claims "no JavaScript on the main
pages," which is no longer strictly true once Navbar's mobile-menu script
and Astro's view-transitions router ship on every page. Needs a wording
tweak when `/logic` is ported, not before.

`npm install` still not run (no `node_modules/` yet) — nothing has been
verified to actually build or `astro dev` yet. First real build/dev check
should happen once page porting (step 4) gives it something to render.

## Next steps, in order

1. ~~Redo the onboarding question batch, write `## Skill Routing`~~ — done.
2. ~~Carve the Astro base in from `~/Development/AtheniumWebsite`~~ — done.
3. ~~Re-skin `global.css`/`Layout.astro`/`Navbar.astro`/`Footer.astro`~~ —
   done, see above for exact scope and the one flagged follow-up
   (`logic.html` copy fix, deferred to step 4).
4. Port the four existing pages (`index.html`, `lens.html`, `logic.html`,
   `projects.html`) into Astro pages/components, preserving the grid-tile
   markup and content verbatim. This is also where the grid-tile system CSS
   (`.tile`, `.grid-container`, `.card-meta`, `.tile-status`, etc. — still
   sitting in the old `style.css`) gets moved into `global.css` or
   per-page styles, and where each page's own inline "back to home" link
   gets removed now that the persistent Navbar supersedes it. Run
   `npm install` + `astro dev` as part of this step to actually verify
   something renders, not before.
5. Replace `update_projects.rb` + its GitHub Actions cron with an Astro
   build-time fetch of top GitHub repos (same behavior, no Ruby dependency).
6. Delete the old plain-HTML/CSS/Ruby files once the Astro version fully
   replaces them.
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
