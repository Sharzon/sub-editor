<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  label: String,
  accept: String,
  id: String
})
const emit = defineEmits(['addFile'])
</script>

<template>
  <label class="file-label" :for="props.id">
    {{ props.label }}
    <input
      class="sr-only"
      type="file"
      :id="props.id"
      :accept="props.accept"
      @change="(event) => emit('addFile', event)"
    />
  </label>
</template>

<style scoped>
.file-label {
  border: 1px solid var(--border-color);
  border-radius: 5px;
  background-color: #93d0b6;
  color: #333333;
  padding: 2px 5px;
  user-select: none;
  cursor: pointer;
}
</style>
