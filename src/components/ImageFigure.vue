<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  src: string,
  caption: string,
}>();

const expandedView = ref(false);

function openExpandedView() {
  if (!expandedView.value)
    expandedView.value = true;
}

const expandedFigureStyle = {
  left: '50%',
  top: '50%',
  'z-index': 5100,
  transform: 'translate(-50%, -50%)',
  'max-height': '100%',
  'max-width': '100%',
  'background-size': 'cover',
};
</script>

<template>
  <div>
    <div
        v-if="expandedView"
        class="position-fixed bg-dark"
        style="z-index: 5050; width: 100vw; height: 100vh; top: 0; left: 0;"
        @click="expandedView = false">
      <button
          type="button" aria-label="Close"
          class="position-fixed btn-close btn-close-white mt-3 me-3"
          style="right: 0"
      >
      </button>
    </div>
    <figure
        class="figure p-3 d-flex flex-column align-items-center"
        :class="{'position-fixed': expandedView}"
        :style="expandedView ? expandedFigureStyle : ''">

      <img
          v-if="src"
          class="figure-img img-fluid rounded w-100"
          :class="{'w-lg-75 w-xxl-50': !expandedView}"
          @click="openExpandedView"
          :src="src" :alt="`Image with caption '${caption}'`"/>
      <slot
          v-else
          class="figure-img img-fluid rounded w-100"
          :class="{'w-lg-75 w-xxl-50': !expandedView}"
          @click="openExpandedView"/>

      <figcaption
          class="figure-caption w-100"
          :class="{'w-lg-75 w-xxl-50': !expandedView}">
        {{ caption }}
      </figcaption>
    </figure>
  </div>
</template>

<style scoped>

</style>