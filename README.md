# sladerose.github.io

Run your own race. Personal portfolio and digital home of Slade Rose.

See `PRODUCT.md` for what this site is and its sections, `DESIGN.md` for the
visual system (dark brutalist grid-tile, rose accent, mono telemetry labels),
and `RESUME.md` for the current state of the Astro migration in progress.

## Stack

Astro, React islands (`@astrojs/react`), Sanity CMS (`@sanity/astro`),
Vercel adapter + `@vercel/analytics`.

## Development

```bash
npm install
npm run dev      # astro dev
npm run build    # astro build
npm run preview  # astro preview
```

`/build` fetches a pinned list of GitHub repos at build time (see
`src/pages/build.astro`) — no separate script or cron job to run.
