# MEMORY.md — Personal Site

## Current Project Stage
Hugo migration complete on `feat/hugo-migration` branch. Ready for deploy preview and testing.

## Session Startup Files
1. `memory/project-details.md`
2. `memory/MEMORY.md`
3. `memory/build-log.md`

## Confirmed Decisions

| Decision | Rationale | Date |
|---|---|---|
| Migrate from React/CRA to Hugo + hugo-coder theme | Simpler stack, enables blog, no JS bundler needed | 2026-03-11 |
| Contact form → Netlify Forms | Drop EmailJS/reCAPTCHA complexity, native Netlify support | 2026-03-11 |
| GitHub heatmap → Dropped | Unnecessary complexity, not core to site purpose | 2026-03-11 |
| Projects → Simple markdown list | No carousels/videos, cleaner look with hugo-coder | 2026-03-11 |
| Experience page → Dropped | Content merged into About page | 2026-03-11 |
| Theme folder: `themes/coder` | Git submodule at this path; hugo.toml uses `theme = "coder"` | 2026-03-11 |
| Hugo version: 0.157.0 | Current installed version, pinned in netlify.toml | 2026-03-11 |

## Pending Decisions

| Decision | Blocked by |
|---|---|
| Custom domain verified on Netlify | User action required after deploy |
| Deploy preview validation | Netlify build + form test needed |
