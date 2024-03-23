
<script setup lang="ts">
import BlogPostTagBadge from "./components/BlogPostTagBadge.vue";
import {data as tags} from './tags.data.js';
</script>

# All Tags

<span v-for="([tag, count], index) in tags" :key="tag" class="is-inline-flex is-align-items-center">
  <BlogPostTagBadge :type="tag"></BlogPostTagBadge>
  <span class="icon">
    <i class="fa fa-times"></i>
  </span>
  {{ count }}
  <span v-if="index < tags.size - 1" class="mr-3">, </span>
</span>
