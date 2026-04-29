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
        responsive: true,
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        userActions: {hotkeys: true},
        sources: [
            {
                src: props.src,
                type: props.src.endsWith('.mpd') ? 'application/dash+xml' : undefined,
            },
        ],
    });
});
onBeforeUnmount(() => {
    if (player.value) {
        player.value.dispose()
    }
})
</script>

<template>
  <figure class="video-figure">
    <div data-vjs-player class="video-figure-player">
      <video ref="videoElement" class="video-js vjs-default-skin" preload="metadata"/>
    </div>
    <figcaption>{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.video-figure {
  display: block;
  margin: 1.5rem auto;
  max-width: min(100%, 900px);
}

.video-figure-player {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.06);
}

figcaption {
  text-align: center;
  font-style: italic;
  font-size: 0.9em;
  color: #666;
  margin-top: 0.6rem;
  line-height: 1.4;
}
</style>

<style>
@import "video.js/dist/video-js.css";
</style>
