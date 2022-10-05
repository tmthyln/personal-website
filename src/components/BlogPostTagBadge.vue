<script setup lang="ts">
import type {BootstrapClass} from "@/types";
import {computed} from "vue";

const props = defineProps<{
  type?: string,
}>();

const badgeClass = computed<BootstrapClass>(() => {
  switch (props.type) {
    case "cs":
    case "julia":
      return 'primary';
    case "umd":
      return 'warning';
    case "hawaii":
    case "travel":
      return 'success';
    case "math":
      return 'info';
    default:
      return 'secondary';
  }
});
</script>

<template>
  <span
      class="badge rounded-pill user-select-none"
      :class="`text-bg-${badgeClass || 'primary'}`">
    {{ type }}
  </span>
</template>

<style scoped>

</style>