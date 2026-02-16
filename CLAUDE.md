# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website and blog for Timothy Lin (https://timothylin.me), built with VitePress (Vite + Vue 3 static site generator).

## Commands

- **Dev server**: `npm run dev` (runs `vitepress dev src`)
- **Build**: `npm run build` (runs `vitepress build src`)
- **Preview build**: `npm run preview` (runs `vitepress preview src`)

No test or lint commands are configured.

## Architecture

### Source Layout (`src/`)

- `.vitepress/config.mts` — VitePress site config (markdown plugins, sitemap, slugify)
- `.vitepress/theme/` — Custom theme: `Layout.vue` (main layout), `index.ts` (registers `FontAwesomeIcon` globally), SCSS styles using Bulma
- `components/` — Reusable Vue components (`BlogPostCard`, `BlogPostTagBadge`, `ImageFigure`, `VideoFigure`, etc.)
- `posts/` — Blog post markdown files
- `lists/` — List-type content pages
- `public/` — Static assets (images, icons, SVG logo)
- `posts.data.ts` / `tags.data.ts` — VitePress data loaders (content aggregation)
- `tags/[tag].paths.ts` — Dynamic route generation for per-tag pages

### Key Patterns

- **ESM-only** project (`"type": "module"` in package.json)
- **Vue components** use `<script setup lang="ts">` with Composition API
- **Blog post front matter**: `title`, `description`, `date` (YYYY-MM-DD), `tags` (string array)
- **Styling**: Bulma CSS framework via SCSS; components use scoped styles
- **Icons**: Font Awesome (brands, regular, solid) via `@fortawesome/vue-fontawesome`
- **Markdown extensions**: footnotes (`markdown-it-footnote`), math/LaTeX (MathJax3 via `markdown-it-mathjax3`), custom anchor permalinks (`markdown-it-anchor` with `@sindresorhus/slugify`)
- **Tag colors** in `BlogPostTagBadge.vue` map tag categories to Bulma color classes
- **Clean URLs** enabled (`cleanUrls: true`) — no `.html` extensions