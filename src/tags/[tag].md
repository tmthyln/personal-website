
# Posts Tagged with \#{{ $params.tag }}

<script setup lang="ts">
import { useData } from 'vitepress';
const { params } = useData();

import {data} from '../posts.data.ts';
import BlogPostCard from "../components/BlogPostCard.vue";

const taggedPosts = data.filter(post => (post.frontmatter.tags ?? []).includes(params.value.tag));
</script>

<BlogPostCard
v-for="post in taggedPosts" :key="post.url"
:title="post.frontmatter.title"
:date="post.frontmatter.date"
:description="post.frontmatter.description"
:tags="post.frontmatter.tags"
:link="post.url"/>
