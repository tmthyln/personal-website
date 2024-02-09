<script setup lang="ts">
import BlogPostCard from "@/components/BlogPostCard.vue";
import allPosts from '@/data/posts.ts';

const props = defineProps<{
    tag: string,
}>()

const taggedPosts = allPosts.filter(postData => {
    const tags = postData.frontmatter.tags ?? [];
    return tags.includes(props.tag)
})
</script>

<template>
  <div>
    <h1 class="mb-6 title is-2">Posts Tagged with #{{ tag }}</h1>

    <BlogPostCard
        v-for="postInfo in taggedPosts" :key="postInfo.frontmatter.title"
        class="mb-4"
        :title="postInfo.frontmatter.title"
        :date="postInfo.frontmatter.date"
        :description="postInfo.frontmatter.description"
        :tags="postInfo.frontmatter.tags"
        :link="postInfo.link"/>
  </div>
</template>