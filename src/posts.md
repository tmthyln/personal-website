
# Fragments of Lint{class="mb-6"}

<script setup lang="ts">
import {data} from './posts.data.ts';
import BlogPostCard from "./components/BlogPostCard.vue";

const postData = data.sort((a, b) => -a.frontmatter.date.localeCompare(b.frontmatter.date))
</script>

<BlogPostCard
    v-for="post in postData" :key="post.url"
    :title="post.frontmatter.title"
    :date="post.frontmatter.date"
    :description="post.frontmatter.description"
    :tags="post.frontmatter.tags"
    :link="post.url"/>
