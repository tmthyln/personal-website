<script setup lang="ts">
// @ts-ignore
import {frontmatter as bogosortingFrontmatter} from './bogosorting.md';
// @ts-ignore
import {frontmatter as turnLeftFrontmatter} from './turn-left-at-next-prime.md';
// @ts-ignore
import {frontmatter as hawaiiFirstHundredFrontmatter} from './hawaii-first-hundred-hours.md';
// @ts-ignore
import {frontmatter as fancyMealFrontmatter} from './fancy-meal.md';

import BlogPostCard from "@/components/BlogPostCard.vue";

const posts = [
  {frontmatter: fancyMealFrontmatter, link: '/posts/fancy-meal'},
  {frontmatter: hawaiiFirstHundredFrontmatter, link: '/posts/hawaii-first-hundred-hours'},
  {frontmatter: turnLeftFrontmatter, link: '/posts/turn-left-at-next-prime'},
  {frontmatter: bogosortingFrontmatter, link: '/posts/bogosorting'},
];
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
