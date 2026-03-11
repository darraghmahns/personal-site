# Personal Site — Project Instructions

## Session Startup
Read these files at the start of every substantive session:
1. `memory/project-details.md`
2. `memory/MEMORY.md`
3. `memory/build-log.md`

## Tech Stack
- Hugo v0.157.0 + hugo-coder theme (themes/coder submodule)
- Hosted on Netlify; contact form via Netlify Forms
- Build: `hugo --minify` → `public/`

## Key Commands
```
hugo server -D          # Local dev with drafts
hugo new posts/my-post.md   # New blog post
hugo --minify           # Production build
```

## Adding a Blog Post
1. Run `hugo new posts/post-title.md`
2. Edit the file in `content/posts/`
3. Set `draft: false` to publish

## Theme Customization
- Override partials by creating matching file in `layouts/_partials/`
- Override layouts by creating matching file in `layouts/`
- Custom CSS/JS: reference in `hugo.toml` params.customCSS / params.customJS
