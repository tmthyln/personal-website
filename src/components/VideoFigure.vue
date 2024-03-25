<script setup lang="ts">
import videojs from 'video.js'
import {onBeforeUnmount, onMounted, ref} from "vue";
import 'video.js/dist/video-js.css';

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
        sources: [
            {
                src: props.src,
            },
        ],
    }, () => {
        console.log('onPlayerReady', player.value)
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
    <video ref="videoElement" preload="metadata"/>
    <figcaption>
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped>

</style>