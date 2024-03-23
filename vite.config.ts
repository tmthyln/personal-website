import {fileURLToPath, URL} from "node:url";

import {defineConfig} from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import Markdown from "vite-plugin-md";
import CompileTime from 'vite-plugin-compile-time';
import code from '@yankeeinlondon/code-builder';
//import link from '@yankeeinlondon/link-builder';
import ViteCompression from 'vite-plugin-compression';
import {rssPlugin as RssPlugin} from "vite-plugin-rss";
import anchor from "markdown-it-anchor";
import hljs from "highlight.js/lib/core";

import slugify from '@sindresorhus/slugify'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        Vue({
            include: [/\.vue$/, /\.md$/],
        }),
        Markdown({
            headEnabled: true,
            meta: {
                routeProps: [
                    'layout',
                    'title',
                    'date',
                    'description',
                    'tags',
                ]
            },
            builders: [
                code(),
                //link(),
            ],
            markdownItSetup(md) {
                const mdAnchor = require('markdown-it-anchor')
                md
                    .use(mdAnchor, {
                        level: 2,
                        permalink: mdAnchor.permalink.linkAfterHeader({
                            class: 'ml-2 is-primary',
                            symbol: '<i class="fa-solid fa-link"></i>',
                            assistiveText: (title: string) => `Permalink to "${title}"`,
                            visuallyHiddenClass: 'is-sr-only',
                            wrapper: ['<span class="is-flex is-align-items-self-start">', '</span>'],
                        }),
                        slugify,
                    })
                    .use(require('markdown-it-texmath'), {
                        engine: require('katex'),
                        delimiters: ['dollars', 'beg_end', 'julia'],
                        katexOptions: {
                            macros: {
                                "\\RR": "\\mathbb{R}",
                            },
                        },
                    })
                    .use(require('markdown-it-table-of-contents'), {
                        listType: 'ol',
                        includeLevel: [2, 3],
                    })
                    .use(require('markdown-it-footnote'))
                    .use(require('markdown-it-task-lists'))
                    .use(require('markdown-it-image-figures'))
            },
        }),
        CompileTime(),
        Pages({
            extensions: ['vue', 'ts', 'js', 'md'],
            onRoutesGenerated: routes => {
                const generateSitemap = require('vite-plugin-pages-sitemap')
                return generateSitemap({
                    routes,
                    hostname: 'https://timothylin.me',  // TODO make this adaptive based on deployment env
                })
            },
        }),
        Layouts(),
        RssPlugin({
            mode: 'define',
            items: [

            ],
            channel: {
                title: 'Fragments of Lint Blog',
                link: 'https://timothylin.me/posts/',
                lastBuildDate: new Date(),
                generator: true,
                ttl: 24,
            },
        }),
        ViteCompression({
            algorithm: 'gzip',
            threshold: 200,
            deleteOriginFile: false,
        }),
        ViteCompression({
            algorithm: 'brotliCompress',
            filter: RegExp(/\.(js|mjs|json|css|html|svg)$/i),
            ext: '.br',
            deleteOriginFile: false,
            threshold: 200,
            compressionOptions: {
                level: 9,
            },
        }),
    ],
    build: {
        sourcemap: true,
        target: 'es2022',
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
