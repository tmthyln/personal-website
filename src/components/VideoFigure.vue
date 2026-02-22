<script setup lang="ts">
import videojs from 'video.js'
import {onBeforeUnmount, onMounted, ref} from "vue";

const props = defineProps<{
  src: string,
  caption: string,
}>();

const player = ref();
const videoElement = ref<HTMLVideoElement>();

onMounted(() => {
    player.value = videojs(videoElement.value, {
        autoplay: false,
        controls: true,
        fluid: true,
        sources: [
            {
                src: props.src,
                type: props.src.endsWith('.mpd') ? 'application/dash+xml' : undefined,
            },
        ],
    })
});
onBeforeUnmount(() => {
    if (player.value) {
        player.value.dispose()
    }
})
</script>

<template>
  <figure class="p-3 is-flex-direction-column is-align-items-center">
    <div data-vjs-player>
      <video ref="videoElement" class="video-js vjs-default-skin" preload="metadata"/>
    </div>
    <figcaption>
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style>
@import "video.js/dist/video-js.css";
</style>
