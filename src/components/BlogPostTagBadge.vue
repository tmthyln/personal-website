<script setup lang="ts">
import type {BulmaColor} from "@/types";
import {computed} from "vue";

const props = defineProps<{
  type?: string,
}>();

const badgeClass = computed<BulmaColor>(() => {
  switch (props.type) {
    case "cs":
    case "julia":
      return 'primary';
    case "umd":
      return 'danger';
    case "hawaii":
    case "travel":
      return 'success';
    case "math":
      return 'info';
    default:
      return 'link';
  }
});
</script>

<template>
  <router-link
      class="tag is-rounded"
      :class="`is-${badgeClass}`"
      :to="`/tags/${type}`">
    {{ type }}
  </router-link>
</template>

<style scoped>

</style>