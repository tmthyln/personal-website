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
  <div class="card is-bordered">
    <div class="card-content">
      <RouterLink v-if="link" class="title" :to="link">
        <h2 class="title is-3 is-flex is-align-items-center">
          {{ formattedTitle }}
          <span v-if="isRecent" class="tag is-medium is-success ml-3">New</span>
        </h2>
      </RouterLink>
      <div class="subtitle is-5 mb-2">
        <small>{{ parsedDate.toLocaleDateString() }}</small>
      </div>
      <div class="mb-2" v-if="tags">
        <BlogPostTagBadge
            v-for="tag in tags" :key="tag"
            class="mr-1"
            :type="tag.toLocaleLowerCase()">
          stuff in slot
        </BlogPostTagBadge>
      </div>
      <p>{{ description }}</p>
      <RouterLink v-if="link" :to="link">
        <em>Read full post</em>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
</style>