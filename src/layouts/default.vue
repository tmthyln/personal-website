<script setup lang="ts">
import NavigationBar from "../components/NavigationBar.vue";
</script>

<template>
  <div class="position-absolute sticky-top w-100 h-100 d-flex flex-column align-items-stretch">
    <header>
      <NavigationBar/>
    </header>
    <main class="position-relative flex-grow-1 pt-4 ps-3 pe-3 pb-2 text-bg-dark">
      <div class="container">
        <RouterView/>
      </div>
    </main>
    <footer class="mt-auto border-top border-1 p-2 text-bg-dark text-center">
      <small>
        © 2019-{{ new Date().getFullYear() }} Timothy Lin.
      </small>
    </footer>
  </div>
</template>