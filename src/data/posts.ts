// @ts-ignore
import {frontmatter as bogosortingFrontmatter} from '../pages/posts/bogosorting.md';
// @ts-ignore
import {frontmatter as turnLeftFrontmatter} from '../pages/posts/turn-left-at-next-prime.md';
// @ts-ignore
import {frontmatter as hawaiiFirstHundredFrontmatter} from '../pages/posts/hawaii-first-hundred-hours.md';
// @ts-ignore
import {frontmatter as fancyMealFrontmatter} from '../pages/posts/fancy-meal.md';

export default [
    {frontmatter: fancyMealFrontmatter, link: '/posts/fancy-meal'},
    {frontmatter: hawaiiFirstHundredFrontmatter, link: '/posts/hawaii-first-hundred-hours'},
    {frontmatter: turnLeftFrontmatter, link: '/posts/turn-left-at-next-prime'},
    {frontmatter: bogosortingFrontmatter, link: '/posts/bogosorting'},
];