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

Was running the `onboard-website-project` skill's standard 4-question batch
(stage / style authority / motion & density / Impeccable proactivity) to
write this project's `CLAUDE.md` → `## Skill Routing` section. The
`AskUserQuestion` call was rejected/interrupted before the user answered —
**redo that question batch from scratch**, don't assume answers. Read
`.claude/skills/onboard-website-project/SKILL.md` for exact question wording
and output format if needed (symlinked, resolves to
`~/Development/Websites/.claude/skills/onboard-website-project/SKILL.md`).

Note: invoking it via the `Skill` tool by name failed ("Unknown skill") in
the prior session because the session's cwd wasn't inside this project at
startup. Starting a fresh session with cwd inside this folder should register
it correctly — try `Skill` tool first before falling back to following the
SKILL.md instructions manually.

## Next steps, in order

1. Redo the onboarding question batch, write `## Skill Routing` into this
   project's `CLAUDE.md` (create the file if it doesn't exist — one-line
   project name/description at top, then that section).
2. Carve the Astro base in from `~/Development/AtheniumWebsite`: copy
   `src/layouts/Layout.astro`, `src/components/Navbar.astro`,
   `src/components/Footer.astro`, `src/styles/global.css`, `package.json`,
   `astro.config.mjs`, `public/`, `src/sanity/`, `src/components/
   SanityStudio.tsx`, `src/pages/admin/`. Skip the Athenium-specific
   images/pages listed above.
3. Re-skin `global.css` with this project's own tokens from `DESIGN.md`
   (rose `#ff0055`, not Athenium's orange `#FF4C00`) — keep the structural/
   technique pieces (theme-init script, view transitions, scroll-reveal),
   drop or simplify anything (like light-mode tokens) not asked for.
4. Port the four existing pages (`index.html`, `lens.html`, `logic.html`,
   `projects.html`) into Astro pages/components, preserving the grid-tile
   markup and content verbatim.
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
