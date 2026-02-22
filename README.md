# Personal Website

Source for [timothylin.me](https://timothylin.me) — a personal blog and portfolio built with [VitePress](https://vitepress.dev).

## Tech Stack

- **VitePress** — static site generator (Vite + Vue 3)
- **Bulma** — CSS framework (via SCSS)
- **Font Awesome** — icons
- **markdown-it** plugins — footnotes, MathJax/LaTeX, anchor links

## Development

```bash
npm install
npm run dev      # start dev server
npm run build    # build for production
npm run preview  # preview production build
```

## Structure

```
src/
├── .vitepress/
│   ├── config.mts       # site config
│   └── theme/           # custom theme (Layout.vue, styles)
├── components/          # reusable Vue components
├── posts/               # blog post markdown files
├── lists/               # list-type content pages
├── public/              # static assets
├── posts.data.ts        # blog post data loader
└── tags.data.ts         # tag aggregation data loader
```

## Blog Posts

Posts live in `src/posts/` as Markdown files with front matter:

```yaml
---
title: Post Title
description: Short description
date: YYYY-MM-DD
tags: [tag1, tag2]
---
```