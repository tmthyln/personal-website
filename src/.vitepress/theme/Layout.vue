<script setup lang="ts">
import {Content, useData} from "vitepress";
import {computed, onMounted, ref, watch} from "vue";
import {data as lastCopyrightYear} from './build-year.data.ts';
import {faGithubSquare, faLinkedin, faSquareInstagram} from "@fortawesome/free-brands-svg-icons";
import BlogPostTagBadge from "../../components/BlogPostTagBadge.vue";

const expandMenu = ref(false);

const placeLinks = [
    {
        text: 'GitHub',
        link: 'https://github.com/tmthyln/',
        icon: {
            icon: faGithubSquare,
        },
    }, {
        text: 'LinkedIn',
        link: 'https://www.linkedin.com/in/tmthyln/',
        icon: {
            icon: faLinkedin,
            style: 'color: #0077B5',
        },
    }, {
        text: 'Instagram',
        link: 'https://www.instagram.com/tmthyln/',
        icon: {
            icon: faSquareInstagram,
        },
    },
];

const {page, frontmatter} = useData()
const isPostPage = computed(() => page.value.relativePath.startsWith('posts') && page.value.relativePath.split('/').length >= 2);
const hasComments = isPostPage;

const postTitle = computed(() => {
  const raw = frontmatter.value.title ?? '';
  return raw.split('|')[0].trim();
});

function parseDate(str: string) {
  const parts = str.split('-');
  return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
}

const postDate = computed(() => {
  const d = frontmatter.value.date;
  if (!d) return null;
  const parsed = typeof d === 'string' ? parseDate(d) : new Date(d);
  return parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
});

function flattenHeaders(headers: any[]): any[] {
  const result: any[] = [];
  for (const h of headers) {
    result.push(h);
    if (h.children?.length) {
      result.push(...flattenHeaders(h.children));
    }
  }
  return result;
}

const flatHeaders = computed(() => flattenHeaders(page.value.headers ?? []));
const postId = computed(() => {
    const routeParts = page.value.relativePath.split('/')
    return routeParts[routeParts.length - 1]
})
const graphComment = ref<HTMLDivElement>();
const scriptContainer = ref<HTMLDivElement>();

function registerGraphComment() {
    if ("textContent" in graphComment.value) {
        graphComment.value.textContent = ''
    }

    if (hasComments.value && postId.value) {
        // @ts-ignore
        //window.graphcomment({
        //    graphcomment_id: "tmthyln-portfolio-website",
        //    uid: postId.value,
        //})
    }
}
onMounted(registerGraphComment)
watch(
    postId,
    registerGraphComment,
)
</script>

<template>
  <div class="is-flex is-flex-direction-column" style="min-height: 100vh;">
    <nav class="navbar is-primary is-transparent" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/" @click="expandMenu = false">
          <img class="mr-2" src="/personal.svg" width="30" height="30" alt="Timothy Lin's logo">
          <span>Timothy Lin</span>
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="expandMenu = !expandMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="{'is-active': expandMenu}">
        <div class="navbar-start">

          <a class="navbar-item" href="/posts" @click="expandMenu = false">
            Blog
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <p class="navbar-link">
              Lists
            </p>

            <div class="navbar-dropdown has-background-primary">
              <a class="navbar-item has-text-dark" href="/lists/states" @click="expandMenu = false">
                US States
              </a>
              <a class="navbar-item has-text-dark" href="/lists/natparks" @click="expandMenu = false">
                National Parks
              </a>
              <a class="navbar-item has-text-dark" href="/lists/cities" @click="expandMenu = false">
                Cities
              </a>
              <a class="navbar-item has-text-dark" href="/lists/beef" @click="expandMenu = false">
                Beef Noodles
              </a>
            </div>
          </div>

          <div class="navbar-item has-dropdown is-hoverable">
            <p class="navbar-link">
              Places
            </p>

            <div class="navbar-dropdown has-background-primary">
              <a v-for="place in placeLinks" :key="place.link" class="navbar-item" :href="place.link">
                <div class="is-flex is-align-items-center has-text-dark">
                  <FontAwesomeIcon class="icon mr-2 fa-xs" v-bind="place.icon"/>
                  <span>{{ place.text }}</span>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </nav>

    <div class="container content section" :class="{ 'post-page': isPostPage }">
      <header v-if="isPostPage" class="post-header mb-5">
        <h1 class="title is-1 mb-3">{{ postTitle }}</h1>
        <p v-if="frontmatter.description" class="post-description">{{ frontmatter.description }}</p>
        <hr/>
        <div class="post-meta">
          <div v-if="frontmatter.tags?.length" class="post-meta-col">
            <span class="post-meta-label">Tags</span>
            <div>
              <BlogPostTagBadge
                  v-for="tag in frontmatter.tags" :key="tag"
                  class="mr-1"
                  :type="tag.toLowerCase()"
              />
            </div>
          </div>
          <div v-if="postDate" class="post-meta-col">
            <span class="post-meta-label">Published</span>
            <span>{{ postDate }}</span>
          </div>
        </div>
        <hr/>
      </header>
      <details v-if="isPostPage && flatHeaders.length" class="post-toc mb-5">
        <summary class="post-toc-summary">Contents</summary>
        <nav class="post-toc-nav">
          <a
              v-for="h in flatHeaders" :key="h.link"
              :href="h.link"
              class="post-toc-item"
              :class="`post-toc-level-${h.level}`"
          >{{ h.title }}</a>
        </nav>
      </details>
      <Content/>
      <div id="graphcomment" ref="graphComment" class="mt-6"/>
    </div>

    <footer class="footer mt-auto">
      <div class="content has-text-centered">
        <p>
          © 2019-{{ lastCopyrightYear }} Timothy Lin.
        </p>
      </div>

      <div ref="scriptContainer"></div>
    </footer>
  </div>
</template>

<style scoped>
.footer {
  padding: 1.5rem 1.5rem;
}

.post-description {
  font-size: 1.15rem;
  color: #444;
  line-height: 1.6;
}

:global(html.dark) .post-description {
  color: #e0e0e0;
}

.post-meta {
  display: flex;
  gap: 3rem;
}

.post-meta-col {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.post-meta-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #888;
}

.post-toc {
  border-left: 3px solid #ddd;
  padding: 1rem 1.5rem;
}

.post-toc-summary {
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.post-toc-summary::before {
  content: '▶';
  font-size: 0.7rem;
  transition: transform 0.2s ease;
  display: inline-block;
}

.post-toc[open] > .post-toc-summary::before {
  transform: rotate(90deg);
}

.post-toc-summary::-webkit-details-marker {
  display: none;
}

.post-toc-nav {
  display: flex;
  flex-direction: column;
  margin-top: 0.75rem;
}

.post-toc-item {
  padding: 0.2rem 0;
  text-decoration: none;
  line-height: 1.5;
}

.post-toc-item:hover {
  text-decoration: underline;
}

.post-toc-level-2 {
  font-weight: 600;
  color: #e67e22;
}

.post-toc-level-3 {
  padding-left: 1.25rem;
  font-weight: 400;
  color: #888;
  font-size: 0.95rem;
}

.post-toc-level-4 {
  padding-left: 2.5rem;
  font-weight: 400;
  color: #aaa;
  font-size: 0.9rem;
}
</style>

<style>
.post-page h1:not(.title) {
  display: none;
}

.post-page .table-of-contents {
  display: none;
}
</style>