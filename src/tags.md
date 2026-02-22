
<script setup lang="ts">
import BlogPostTagBadge from "./components/BlogPostTagBadge.vue";
import {data as tags} from './tags.data.js';
</script>

# All Tags

<div class="tags">
  <div v-for="[tag, count] in tags" :key="tag" class="tags has-addons mb-2">
    <BlogPostTagBadge :type="tag" />
    <span class="tag is-rounded">{{ count }}</span>
  </div>
</div>
