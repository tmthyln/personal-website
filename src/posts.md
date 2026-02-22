
<div class="is-flex is-flex-wrap-wrap is-align-items-baseline is-justify-content-space-between mb-6">
  <h1>Fragments of Lint</h1>
  <a href="/tags">Browse by tag</a>
</div>

<script setup lang="ts">
import {data} from './posts.data.ts';
import BlogPostCard from "./components/BlogPostCard.vue";
</script>

<BlogPostCard
    v-for="post in data" :key="post.url"
    :title="post.frontmatter.title"
    :date="post.frontmatter.date"
    :description="post.frontmatter.description"
    :tags="post.frontmatter.tags"
    :link="post.url"/>
