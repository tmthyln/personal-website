<script setup lang="ts">
import {computed} from "vue";
import BlogPostTagBadge from "@/components/BlogPostTagBadge.vue";

const props = defineProps<{
  title: string,
  date: Date | string,
  description: string,
  tags?: string[],
  link?: string,
}>();

const formattedTitle = computed(() => props.title.split('|')[0].trim());

function parseDate(stringRepresentation: string) {
  const components = stringRepresentation.split('-');
  return new Date(
      parseInt(components[0]),
      parseInt(components[1]) - 1,
      parseInt(components[2]),
  );
}
const parsedDate = computed(() => typeof props.date === 'string' ? parseDate(props.date) : props.date);

const isRecent = computed(() => {
  const threshold = new Date();
  threshold.setDate(threshold.getDate() - 7);

  return parsedDate.value >= threshold;
});
</script>

<template>
  <div class="card text-bg-dark border">
    <div class="card-body">
      <RouterLink v-if="link" :to="link" class="text-decoration-none">
        <h3 class="card-title">
          {{ formattedTitle }}
          <span v-if="isRecent" class="badge text-bg-light p-1 ps-2 pe-2 ms-2">New</span>
        </h3>
      </RouterLink>
      <h6 class="card-subtitle mb-2 text-muted">
        <small class="user-select-all">{{ parsedDate.toLocaleDateString() }}</small>
      </h6>
      <div class="card-text mb-2" v-if="tags">
        <BlogPostTagBadge
            v-for="tag in tags" :key="tag"
            class="me-1"
            :type="tag.toLocaleLowerCase()">
          stuff in slot
        </BlogPostTagBadge>
      </div>
      <p class="card-text">{{ description }}</p>
      <RouterLink v-if="link" :to="link" class="card-link text-decoration-none">
        <em>Read full post</em>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>

</style>