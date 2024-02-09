<script setup lang="ts">
import allPosts from '@/data/posts.ts';
import BlogPostTagBadge from "@/components/BlogPostTagBadge.vue";

const tags = allPosts
    .reduce((tagFreq, post) => {
        (post.frontmatter.tags ?? []).forEach(tag => {
            if (tagFreq.has(tag)) {
                tagFreq.set(tag, tagFreq.get(tag) + 1)
            } else {
                tagFreq.set(tag, 1)
            }
        })
        return tagFreq
    }, new Map<string, number>())
</script>

<template>
  <div>
    <h1 class="mb-6 title is-2">All Tags</h1>

    <span v-for="([tag, count], index) in tags.entries()" :key="tag" class="is-inline-flex is-align-items-center">
      <BlogPostTagBadge :type="tag"/>
      <span class="icon">
        <i class="fa fa-times"></i>
      </span>
      {{ count }}
      <span v-if="index < tags.size - 1" class="mr-3">, </span>
    </span>

  </div>
</template>