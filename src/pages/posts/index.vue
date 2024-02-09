<script setup lang="ts">
import BlogPostCard from "@/components/BlogPostCard.vue";
import posts from '../../data/posts.ts';
</script>

<template>
  <h1 class="mb-6 title is-2">Fragments of Lint</h1>
  <BlogPostCard
      v-for="postInfo in posts" :key="postInfo.frontmatter.title"
      class="mb-4"
      :title="postInfo.frontmatter.title"
      :date="postInfo.frontmatter.date"
      :description="postInfo.frontmatter.description"
      :tags="postInfo.frontmatter.tags"
      :link="postInfo.link"/>
</template>
