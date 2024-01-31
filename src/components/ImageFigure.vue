<script setup lang="ts">
import {ref} from "vue";

defineProps<{
  src?: string,
  caption: string,
}>();

const expandedView = ref(false);

function openExpandedView() {
  if (!expandedView.value)
    expandedView.value = true;
}

</script>

<template>
  <div>
    <figure
        class="p-3 is-flex-direction-column">

      <slot class="is-rounded" @click="openExpandedView">
        <img
            class="is-rounded"
            @click="openExpandedView"
            :src="src" :alt="`Image with caption '${caption}'`"/>
      </slot>

      <figcaption>
        {{ caption }}
      </figcaption>
    </figure>

    <div class="modal" :class="{'is-active': expandedView}">
      <div class="modal-background" @click="expandedView = false"/>
      <div class="modal-content">

        <slot class="is-rounded">
          <img
              class="is-rounded"
              @click="openExpandedView"
              :src="src" :alt="`Image with caption '${caption}'`"/>
        </slot>

      </div>
      <button class="modal-close is-large" aria-label="close" @click="expandedView = false"/>
    </div>
  </div>
</template>

<style scoped>

</style>