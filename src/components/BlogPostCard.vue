<script setup lang="ts">
import {computed} from "vue";
import BlogPostTagBadge from "./BlogPostTagBadge.vue";

const props = defineProps<{
    title: string,
    date: Date | string,
    description: string | null | undefined,
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

const formattedDate = computed(() => parsedDate.value.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
}));

const isRecent = computed(() => {
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - 7);

    return parsedDate.value >= threshold;
});
</script>

<template>
  <div class="card is-bordered">
    <div class="card-content">
      <a v-if="link" :href="link">
        <h2 class="title is-3 mb-3 is-flex is-align-items-center">
          {{ formattedTitle }}
          <span v-if="isRecent" class="tag is-medium is-success ml-3">New</span>
        </h2>
      </a>
      <p v-if="description" class="post-description">
        {{ description }}
        <a v-if="link" :href="link" class="post-description-readmore"><em>Read more</em></a>
      </p>
      <hr/>
      <div class="post-meta">
        <div v-if="tags?.length" class="post-meta-col">
          <span class="post-meta-label">Tags</span>
          <div>
            <BlogPostTagBadge
                v-for="tag in tags" :key="tag"
                class="mr-1"
                :type="tag.toLowerCase()"
            />
          </div>
        </div>
        <div class="post-meta-col">
          <span class="post-meta-label">Published</span>
          <span>{{ formattedDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-description {
  font-size: 1.15rem;
  color: #444;
  line-height: 1.6;
}

:global(html.dark) .post-description {
  color: #e0e0e0;
}

.post-description-readmore {
  margin-left: 0.25rem;
  white-space: nowrap;
}

.post-meta {
  display: flex;
  gap: 3rem;
}

.post-meta-col {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.post-meta-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #888;
}
</style>
