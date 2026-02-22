<script setup lang="ts">
defineProps<{
    title: string
}>()
</script>

<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ title }}</p>
      <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
      </button>
    </header>
  </div>
</template>

<style scoped>

</style>