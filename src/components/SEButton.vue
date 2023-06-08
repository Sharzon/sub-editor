<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  text: String
})
const emit = defineEmits(['click'])
</script>

<template>
  <button class="button" @click="($event) => emit('click', $event)">
    {{ props.text }}
  </button>
</template>

<style scoped>
.button {
  border: 1px solid var(--border-color);
  border-radius: 5px;
  background-color: #93d0b6;
  padding: 2px 5px;
  font: inherit;
  color: #333333;
  user-select: none;
  cursor: pointer;
}
</style>
