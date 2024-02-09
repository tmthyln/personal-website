<script setup lang="ts">
import {RouterView} from "vue-router";
import NavigationBar from "@/components/NavigationBar.vue";

const lastCopyrightYear = import.meta.compileTime('./data/build-year.ts')
</script>

<template>
  <div class="is-flex is-flex-direction-column" style="min-height: 100vh;">

    <NavigationBar/>

    <main id="main-content" class="container content section">
      <RouterView/>
    </main>

    <footer class="footer mt-auto">
      <div class="content has-text-centered">
        <p>
          © 2019-{{ lastCopyrightYear }} Timothy Lin.
        </p>
      </div>
    </footer>

  </div>
</template>

<style>
</style>
