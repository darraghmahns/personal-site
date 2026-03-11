# Build Log

## 2026-03-11 — Hugo Migration (feat/hugo-migration)

### What was done
Migrated personal site from React/CRA to Hugo + hugo-coder theme.

### Decisions made
| Decision | Rationale |
|---|---|
| Big-bang replacement on feature branch | Cleanest cut, no hybrid state |
| Use `themes/coder` submodule path | Matches git submodule add command output |
| Projects rendered as markdown list | Simplified from carousel/video to clean text list |
| Contact via Netlify Forms | Drops EmailJS/reCAPTCHA entirely |
| Custom `layouts/projects/list.html` | Maps `_index.md` content to page layout (not section list) |

### Files created/updated
| File | What changed | Why |
|---|---|---|
| `hugo.toml` | Full site config | New Hugo site config |
| `netlify.toml` | Hugo build command, HUGO_VERSION=0.157.0 | Replaces CRA build |
| `.gitignore` | Hugo-standard ignores | Remove CRA ignores |
| `archetypes/default.md` | YAML frontmatter with tags | Better blog post defaults |
| `content/about.md` | Experience + education in markdown | Replaces Home.tsx + Experience.tsx |
| `content/contact.md` | Netlify Forms HTML form | Replaces EmailJS/reCAPTCHA contact |
| `content/privacy.md` | Privacy policy in markdown | Replaces Privacy.tsx |
| `content/projects/_index.md` | All 7 projects as markdown | Replaces Projects.tsx |
| `content/posts/_index.md` | Empty blog section | Ready for future posts |
| `layouts/projects/list.html` | Custom layout | Renders projects _index.md as page |
| `static/images/profile.jpg` | Profile photo | Copied from git history |
| `static/favicon.ico` | Favicon | Copied from git history |
| `memory/MEMORY.md` | Memory index | Created |
| `memory/project-details.md` | Full project context | Created |
| `memory/build-log.md` | This file | Created |

### Deleted
- `src/` — React/CRA source
- `public/` — CRA build output
- `scripts/` — fetch-contributions.mjs
- `.github/` — update-contributions.yml workflow
- `package.json`, `package-lock.json`, `tsconfig.json`, `.nvmrc`
- `README.md` (to be rewritten)
- `node_modules/`, `build/`

### Current state
- Hugo builds cleanly: 15 pages, 163ms
- All content pages render: home, about, projects, posts, contact, privacy
- Contact form has `data-netlify="true"` attribute
- Profile photo and favicon restored from git history
- Branch: `feat/hugo-migration` — not yet pushed

### Next steps for user
1. Test locally: `hugo server -D`
2. Push branch and open PR or merge to main
3. Verify Netlify deploy preview builds successfully
4. Test contact form submission on deploy preview
5. Check mobile layout and dark mode toggle
