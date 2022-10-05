<script setup lang="ts">
// @ts-ignore
import {frontmatter as bogosortingFrontmatter} from './Bogosorting.md';
// @ts-ignore
import {frontmatter as turnLeftFrontmatter} from './TurnLeftAtNextPrime.md';
// @ts-ignore
import {frontmatter as hawaiiFirstHundredFrontmatter} from './HawaiiFirstHundredHours.md';
// @ts-ignore
import {frontmatter as fancyMealFrontmatter} from './FancyMeal.md';

import BlogPostCard from "@/components/BlogPostCard.vue";

const posts = [
  {frontmatter: fancyMealFrontmatter, link: '/posts/FancyMeal'},
  {frontmatter: hawaiiFirstHundredFrontmatter, link: '/posts/HawaiiFirstHundredHours'},
  {frontmatter: turnLeftFrontmatter, link: '/posts/TurnLeftAtNextPrime'},
  {frontmatter: bogosortingFrontmatter, link: '/posts/Bogosorting'},
];
</script>

<template>
  <h1 class="mb-4">Fragments of Lint</h1>
  <BlogPostCard
      v-for="postInfo in posts" :key="postInfo.frontmatter.title"
      :title="postInfo.frontmatter.title"
      :date="postInfo.frontmatter.date"
      :description="postInfo.frontmatter.description"
      :tags="postInfo.frontmatter.tags"
      :link="postInfo.link"
      class="mb-3"/>
</template>
