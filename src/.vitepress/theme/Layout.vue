<script setup lang="ts">
import {Content, useData} from "vitepress";
import {computed, onMounted, ref, watch} from "vue";
import {data as lastCopyrightYear} from './build-year.data.ts';

const expandMenu = ref(false);

const placeLinks = [
    {
        text: 'GitHub',
        link: 'https://github.com/tmthyln/',
        icon: '<i class="fab fa-fw fa-github-square" aria-hidden="true">',
    }, {
        text: 'LinkedIn',
        link: 'https://www.linkedin.com/in/tmthyln/',
        icon: '<i class="fab fa-fw fa-linkedin" style="color: #0077B5" aria-hidden="true"></i>',
    }, {
        text: 'Polywork',
        link: 'https://work.timothylin.me/',
        icon: '<i class="fas fa-fw fa-pen-nib" aria-hidden="true"></i>',
    }, {
        text: 'Instagram',
        link: 'https://www.instagram.com/tmthyln/',
        icon: '<i class="fab fa-square-instagram" aria-hidden="true"></i>'
    },
];

const {page} = useData()
const hasComments = computed(() => page.value.relativePath.startsWith('posts') && page.value.relativePath.split('/').length >= 2);
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
              Places
            </p>

            <div class="navbar-dropdown">
              <a v-for="place in placeLinks" :key="place.link" class="navbar-item" :href="place.link">
                <div class="is-flex is-align-items-center">
                  <span class="icon" v-html="place.icon"></span>
                  <span>{{ place.text }}</span>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </nav>

    <div class="container content section">
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

</style>