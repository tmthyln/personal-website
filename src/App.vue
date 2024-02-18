<script setup lang="ts">
import {RouterView, useRoute} from "vue-router";
import NavigationBar from "@/components/NavigationBar.vue";
import {computed, onMounted, ref, watch} from "vue";

const lastCopyrightYear = import.meta.compileTime('./data/build-year.ts')

const route = useRoute();
const hasComments = computed(() => route.path.startsWith('/posts') && route.path.split('/').length >= 3);
const postId = computed(() => {
    const routeParts = route.path.split('/')
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
        window.graphcomment({
            graphcomment_id: "tmthyln-portfolio-website",
            uid: postId.value,
        })
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

    <NavigationBar/>

    <main id="main-content" class="container content section">
      <RouterView/>
      <div id="graphcomment" ref="graphComment" class="mt-6"/>
    </main>

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

<style>
</style>
