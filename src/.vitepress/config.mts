import { defineConfig } from 'vitepress'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItAnchor from 'markdown-it-anchor'
import slugify from '@sindresorhus/slugify'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Timothy Lin",
    description: "Personal website and blog of Timothy Lin",
    cleanUrls: true,
    lastUpdated: true,
    head: [
        ['link', {rel: 'icon', href: '/personal.svg'}],
        ['meta', {name: 'google-site-verification', content: 'wwWgMNN1BwT0kpMBWB_ERHNJvehmiu_rs-sSrvTkm1Q'}],
        ['meta', {name: 'theme-color', content: '#212529'}],
        ['script', {src: '/lib/graphcomment.js', type: 'text/javascript'}, ''],
    ],
    markdown: {
        toc: {
            listTag: 'ol',
        },
        anchor: {
            permalink: markdownItAnchor.permalink.linkAfterHeader({
                class: 'ml-2 is-link',
                space: true,
                placement: 'before',
                assistiveText: (title) => `Permalink to "${title}"`,
                visuallyHiddenClass: 'is-sr-only',
                wrapper: ['<span class="is-flex is-align-items-self-start">', '</span>'],
            }),
            level: 2,
            slugify,
        },
        math: true,
        config: (md) => {
            md.use(markdownItFootnote)
        },
    },
    sitemap: {
        hostname: 'https://timothylin.me',
    },
})
