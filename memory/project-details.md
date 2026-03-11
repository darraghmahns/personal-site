# Project Details — Personal Site

## Mission
Personal portfolio and blog site for Darragh Mahns at darraghmahns.com.

## Tech Stack
- **Static site generator:** Hugo v0.157.0
- **Theme:** hugo-coder (submodule at `themes/coder`)
- **Hosting:** Netlify
- **Contact form:** Netlify Forms (no backend required)
- **Build command:** `hugo --minify`
- **Publish dir:** `public/`

## Repo Structure
```
/
├── archetypes/
│   └── default.md          # Blog post archetype
├── content/
│   ├── about.md            # About/Experience page
│   ├── contact.md          # Contact form (Netlify Forms)
│   ├── privacy.md          # Privacy policy
│   ├── posts/
│   │   └── _index.md       # Blog section index
│   └── projects/
│       └── _index.md       # Projects list (markdown)
├── layouts/
│   └── projects/
│       └── list.html       # Custom layout for projects list page
├── memory/                 # Claude's memory files
├── static/
│   ├── favicon.ico
│   └── images/
│       └── profile.jpg     # Profile photo
├── themes/
│   └── coder/              # hugo-coder theme (git submodule)
├── .gitignore
├── hugo.toml               # Hugo config: author, social, menus
└── netlify.toml            # Netlify build config
```

## Site Pages
| URL | Source |
|---|---|
| `/` | Home (from hugo.toml params: author, info, avatar, social) |
| `/about/` | `content/about.md` — experience and education |
| `/projects/` | `content/projects/_index.md` — project list |
| `/posts/` | `content/posts/` — blog index (empty, ready for posts) |
| `/contact/` | `content/contact.md` — Netlify Forms form |
| `/privacy/` | `content/privacy.md` — Mahns Consulting privacy policy |

## Social Links
- GitHub: https://github.com/darraghmahns
- LinkedIn: https://www.linkedin.com/in/darraghmahns
- Email: darraghmahns@gmail.com

## Previous Stack (removed)
React/CRA (TypeScript), EmailJS, reCAPTCHA, GitHub contribution heatmap, react-router-dom.
