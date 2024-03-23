<script setup lang="ts">
import type {BulmaColor} from "@/types";
import {computed} from "vue";

const props = defineProps<{
  type?: string,
}>();

type BulmaColor = 'primary' | 'link' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

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
  <a
      class="tag is-rounded"
      :class="`is-${badgeClass}`"
      :href="`/tags/${type}`">
    {{ type }}
  </a>
</template>

<style scoped>

</style>