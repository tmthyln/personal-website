<script setup lang="ts">
import NavigationBar from "../components/NavigationBar.vue";
</script>

<template>
  <div class="is-flex is-flex-direction-column" style="min-height: 100vh;">

    <NavigationBar/>

    <main class="container content section">
      <RouterView/>
    </main>

    <footer class="footer mt-auto">
      <div class="content has-text-centered">
        <p>
          © 2019-{{ new Date().getFullYear() }} Timothy Lin.
        </p>
      </div>
    </footer>

  </div>
</template>