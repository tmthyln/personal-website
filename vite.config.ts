import {fileURLToPath, URL} from "node:url";

import {defineConfig} from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import Markdown from "vite-plugin-md";
import generateSitemap from "vite-plugin-pages-sitemap";
import CompileTime from 'vite-plugin-compile-time';
import code from '@yankeeinlondon/code-builder';
import meta from '@yankeeinlondon/meta-builder';
//import link from '@yankeeinlondon/link-builder';
import ViteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        Vue({
            include: [/\.vue$/, /\.md$/],
        }),
        Markdown({
            markdownItOptions: {
                html: true,
                typographer: true,
            },
            headEnabled: true,
            builders: [
                code(),
                //link(),
                meta({
                    routeProps: [
                        'layout',
                        'title',
                        'date',
                        'description',
                        'tags',
                    ]
                }),
            ],
            markdownItSetup(md) {
                // heading anchors
                const anchor = require('markdown-it-anchor');
                md.use(anchor, {
                    level: 2,
                    permalink: anchor.permalink.linkAfterHeader({
                        class: 'ml-2 is-primary',
                        symbol: '<i class="fa-solid fa-link"></i>',
                        assistiveText: (title: string) => `Permalink to "${title}"`,
                        visuallyHiddenClass: 'is-sr-only',
                        wrapper: ['<span class="is-flex is-align-items-self-start">', '</span>'],
                    }),
                });

                // code highlighting
                const hljs = require('highlight.js/lib/core');
                hljs.registerLanguage('java', require('highlight.js/lib/languages/java'));
                hljs.registerLanguage('julia', require('highlight.js/lib/languages/julia'));

                md.use(require('markdown-it-highlightjs'), {
                    code: true,
                    inline: true,
                    hljs,
                });

                // equations
                md.use(require('markdown-it-texmath'), {
                    engine: require('katex'),
                    delimiters: ['dollars', 'beg_end', 'julia'],
                    katexOptions: {
                        macros: {
                            "\\RR": "\\mathbb{R}",
                        },
                    },
                });

                md.use(require('markdown-it-footnote'));
                md.use(require('markdown-it-table-of-contents'), {
                    listType: 'ol',
                    includeLevel: [2],
                });
                md.use(require('markdown-it-task-lists'));
                md.use(require('markdown-it-image-figures'));
            },
        }),
        CompileTime(),
        Pages({
            extensions: ['vue', 'ts', 'js', 'md'],
            onRoutesGenerated: routes => (generateSitemap({
                routes,
                hostname: 'https://timothylin.me',  // TODO make this adaptive based on deployment env
            })),
        }),
        Layouts(),
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
