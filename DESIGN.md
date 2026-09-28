# Design system — sladerose.github.io

Existing, shipped design. Source of truth for tokens below. Elevate craft within
this system; do not replace it with a different visual direction.

## Identity

Brutalist / industrial terminal aesthetic. "Operational protocol" framing —
tiles read like system status panels (`CARD_META // 00.1`, `STATUS // ACTIVE_NODE`).
Flush grid, hard edges, no rounded corners, no soft shadows.

## Color tokens

```css
--color-bg-base: #0a0a0a;
--color-bg-surface: #111111;
--color-bg-elevated: #1a1a1a;

--color-text-primary: #ffffff;
--color-text-secondary: #888888;
--color-text-muted: #444444;

--color-accent-brand: #ff0055; /* Electric Rose — signature accent */
--color-border-grid: #2a2a2a;
```

Dark mode only. No light theme.

## Typography

```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'Space Mono', monospace;
```

- Headings (`h1`–`h3`): Inter, weight 900, `letter-spacing: -0.05em`, uppercase,
  `line-height: 0.9`. Brutalist scale via `clamp()`.
- Metadata labels (`.card-meta`, `.tile-status`, `.photo-label`, `.lang-tag`):
  Space Mono, small size (0.55–0.7rem), wide letter-spacing (0.15–0.25em),
  uppercase.
- Body copy: Inter, `--color-text-secondary`, `max-width: 90%`, generous
  line-height (1.6).

## Layout — grid tile system

- CSS Grid, flush (`gap: 0`), background fills grid gaps with
  `--color-border-grid` to fake 0.5px hairline borders between tiles.
- Homepage: 4-column x 2-row grid. Spanning utilities: `.tile-2x2`, `.tile-2x1`.
- Sub-pages (`logic.html`): 3-column x 2-row variant.
- Sub-pages (`lens.html`): photo grid, 4-col desktop, collapses to 2-col on
  tablet, stacked on mobile.
- Tiles: `.tile` — full-bleed background, padding via `clamp(2rem, 5vw, 6rem)`,
  metadata pinned top-left (`.card-meta`), status pinned bottom-left
  (`.tile-status`, colored with accent).
- Hover: background steps from `--color-bg-base` to `--color-bg-surface`.
  Photo tiles: image scales 1.04x and desaturation (grayscale 20% → 0%)
  clears on hover.

## Motion

- Entrance only: "mechanical load-in" — tiles fade + scale from 0.995 +
  translateY(10px) to full, `cubic-bezier(0.2, 0.8, 0.2, 1)`, 0.6s, staggered
  via `--delay` custom property (`calc(var(--delay) * 80ms + 100ms)`).
- No scroll-triggered pinning, no bounce/elastic easing, no continuous loops.
- Texture: fixed SVG fractal-noise overlay at 0.02 opacity over the whole
  viewport (subtle grain, not a visible effect).

## Content conventions

- Nav labels use the `/slug` convention (`/build`, `/lens`, `/logic`,
  `/connect`) framed as "vectors" or "sensors" in metadata labels.
- Status/meta strings are uppercase, underscore-separated, monospace,
  formatted like machine telemetry (`ACTIVE_NODE_734`, `MOSAIC_VIEW // 05_REPOS`).
- Placeholder content (e.g. `lens.html` photos) uses picsum.photos seeded URLs
  and a `.photo-placeholder` diagonal-stripe fallback style — real images
  replace these directly, same markup shape.

## What NOT to change without being asked

- The rose accent (`#ff0055`) and the all-dark palette.
- The flush, hairline-bordered grid-of-tiles structure.
- The uppercase mono-label "system telemetry" voice in metadata strings.
- Zero-JS-on-main-pages posture — animation is CSS-only by design, stated
  explicitly as philosophy in `logic.html` ("Build It, Then Delete Half").
