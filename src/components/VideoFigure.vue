<script setup lang="ts">
import {MediaPlayer} from 'dashjs';
import {onMounted, ref} from "vue";

const props = defineProps<{
  src: string,
  caption: string,
}>();

const player = MediaPlayer().create();
const videoElement = ref<HTMLVideoElement>();
onMounted(() => player.initialize(videoElement.value, props.src, false));
</script>

<template>
  <figure class="figure p-3 d-flex flex-column align-items-center">
    <video ref="videoElement" class="figure-img w-100 w-lg-75 w-xxl-50 img-fluid rounded" preload="metadata" controls></video>
    <figcaption
        class="figure-caption">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped>

</style>