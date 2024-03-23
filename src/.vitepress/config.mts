import { defineConfig } from 'vitepress'

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
        math: true,
    },
    sitemap: {
        hostname: 'https://timothylin.me',
    },
})
