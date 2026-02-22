import { defineConfig, createContentLoader } from 'vitepress'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItAnchor from 'markdown-it-anchor'
import slugify from '@sindresorhus/slugify'
import { Feed } from 'feed'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const SITE_URL = 'https://timothylin.me'

async function generateFeed(outDir: string) {
    const feed = new Feed({
        title: 'Fragments of Lint',
        description: 'Personal blog of Timothy Lin',
        author: {
            name: 'Timothy Lin',
            link: SITE_URL,
        },
        id: SITE_URL,
        link: `${SITE_URL}/blog`,
        language: 'en',
        favicon: `${SITE_URL}/personal.svg`,
        copyright: `© ${new Date().getFullYear()} Timothy Lin`,
        feedLinks: {
            rss: `${SITE_URL}/feed.xml`,
        },
    })

    const posts = await createContentLoader('posts/*.md', { render: true }).load()
    posts.sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))

    for (const post of posts) {
        const { frontmatter, url, html } = post
        if (!frontmatter.date) continue
        feed.addItem({
            title: frontmatter.title,
            id: `${SITE_URL}${url}`,
            link: `${SITE_URL}${url}`,
            description: frontmatter.description,
            content: html,
            date: new Date(frontmatter.date),
        })
    }

    writeFileSync(resolve(outDir, 'feed.xml'), feed.rss2())
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Timothy Lin",
    description: "Personal website and blog of Timothy Lin",
    cleanUrls: true,
    lastUpdated: true,
    head: [
        ['link', {rel: 'icon', href: '/personal.svg'}],
        ['link', {rel: 'alternate', type: 'application/rss+xml', title: 'Timothy Lin', href: `${SITE_URL}/feed.xml`}],
        ['meta', {name: 'google-site-verification', content: 'wwWgMNN1BwT0kpMBWB_ERHNJvehmiu_rs-sSrvTkm1Q'}],
        ['meta', {name: 'theme-color', content: '#212529'}],
        ['script', {src: '/lib/graphcomment.js', type: 'text/javascript'}, ''],
    ],
    markdown: {
        headers: true,
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
    buildEnd: ({ outDir }) => generateFeed(outDir),
})
