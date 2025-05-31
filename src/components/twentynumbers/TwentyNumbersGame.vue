<script setup lang="ts">
import {computed, ref} from "vue";

const props = defineProps<{
    n?: number,
    m?: number,
    r?: number,
}>();

const poolSize = computed(() => props.n ?? 1000)
const numSlots = computed(() => props.m ?? 20)
const goalSlots = computed(() => props.r ?? props.m ?? 20)

function generateRandomNumbers() {
    return [...Array(poolSize.value).keys()]
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value + 1)
        .slice(0, goalSlots.value)
}

const slots = ref(new Array(numSlots.value))
const numbers = ref(generateRandomNumbers())
const currentIndex = ref(0);

function resetGame() {
    slots.value = new Array(numSlots.value);
    numbers.value = generateRandomNumbers();
    currentIndex.value = 0;
}

function placeNumber(index) {
    if (currentIndex.value < goalSlots.value && isOrdered.value) {
        slots.value[index] = numbers.value[currentIndex.value]
        currentIndex.value += 1
    }
}

const numFilledSlots = computed(() => slots.value
    .filter(slottedNumber => Boolean(slottedNumber))
    .length
)

const isOrdered = computed(() => slots.value
    .filter(slottedNumber => Boolean(slottedNumber))
    .map((slottedNumber, index, array) => [index > 0 ? array[index - 1] : null, slottedNumber])
    .filter(([prev, next]) => prev !== null)
    .reduce((runningCheck, [prev, next]) => {
        return runningCheck && prev < next
    }, true)
)
</script>

<template>
  <div class="card">
    <div class="card-content">

      <div class="level mb-4">
        <div class="level-left">
          <span v-if="!isOrdered" class="has-text-danger">
            You've lost! Numbers are not in order.
          </span>
          <span v-else-if="currentIndex < goalSlots">
            Place the number {{ numbers[currentIndex] }} in an open slot.
          </span>
          <span v-else class="has-text-success">
            You've won!
          </span>
        </div>

        <div class="level-right has-text-info">
          Goal: Fill {{ goalSlots }} out of {{ numSlots }} slots ({{ goalSlots - numFilledSlots }} more)
        </div>
      </div>

      <div class="level">
        <div
            v-for="(slottedNumber, index) in slots" :key="index"
            class="level-item">
          <span v-if="slottedNumber" class="tag has-text-weight-bold is-primary">
            {{ slottedNumber }}
          </span>
          <span v-else class="tag has-text-grey-light" @click="placeNumber(index)">
            <small class="is-unselectable">{{ index + 1 }}</small>
          </span>
        </div>
      </div>

    </div>
    <div class="card-footer">
      <button class="card-footer-item is-unselectable has-text-primary" @click="resetGame">New Game</button>
    </div>
  </div>
</template>

<style scoped>
</style>