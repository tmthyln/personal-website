<script setup lang="ts">
import dashjs from 'dashjs';
import {onMounted, ref} from "vue";

const MediaPlayer = dashjs.MediaPlayer

const props = defineProps<{
  src: string,
  caption: string,
}>();

const player = MediaPlayer().create();
const videoElement = ref<HTMLVideoElement>();
onMounted(() => player.initialize(videoElement.value, props.src, false));
</script>

<template>
  <figure class="p-3 is-flex-direction-column is-align-items-center">
    <video ref="videoElement" preload="metadata" controls></video>
    <figcaption>
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped>

</style>