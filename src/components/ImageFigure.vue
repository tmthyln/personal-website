<script setup lang="ts">
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import {onBeforeUnmount, ref} from "vue";

const props = defineProps<{
  src?: string,
  caption: string,
}>();

const imgEl = ref<HTMLImageElement | null>(null);
let lightbox: PhotoSwipeLightbox | null = null;

function openLightbox() {
  if (!props.src) return;

  const img = imgEl.value;
  const rect = img?.getBoundingClientRect();
  const width = img?.naturalWidth || rect?.width || 1200;
  const height = img?.naturalHeight || rect?.height || 800;

  lightbox?.destroy();

  lightbox = new PhotoSwipeLightbox({
    dataSource: [{src: props.src, width, height, alt: props.caption}],
    pswpModule: () => import('photoswipe'),
    bgOpacity: 0.95,
    padding: {top: 40, bottom: 80, left: 20, right: 20},
    initialZoomLevel: 'fit',
    secondaryZoomLevel: 2,
    maxZoomLevel: 4,
  });

  const captionText = props.caption;
  lightbox.on('uiRegister', () => {
    lightbox?.pswp?.ui?.registerElement({
      name: 'custom-caption',
      order: 9,
      isButton: false,
      appendTo: 'root',
      html: captionText,
      onInit: (el) => {
        el.classList.add('pswp__custom-caption');
      },
    });
  });

  lightbox.init();
  lightbox.loadAndOpen(0);
}

onBeforeUnmount(() => {
  lightbox?.destroy();
  lightbox = null;
});
</script>

<template>
  <figure class="image-figure">
    <img
        ref="imgEl"
        :src="src"
        :alt="caption"
        @click="openLightbox"/>
    <figcaption>{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.image-figure {
  display: block;
  margin: 1.5rem auto;
  max-width: 100%;
}

.image-figure img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.06);
  cursor: zoom-in;
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
.pswp__custom-caption {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-style: italic;
  font-size: 0.95em;
  text-align: center;
  max-width: 80%;
  background: rgba(0, 0, 0, 0.55);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  pointer-events: none;
  line-height: 1.4;
}
</style>
