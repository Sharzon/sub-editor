<script setup>
import TimeInput from './TimeInput.vue'

const props = defineProps({
  modelValue: {
    required: true,
    type: Object
  }
})
const emit = defineEmits(['update:modelValue'])
const updateStartTime = (startTime) => {
  emit('update:modelValue', {
    ...props.modelValue,
    startTime
  })
}
const updateEndTime = (endTime) => {
  emit('update:modelValue', {
    ...props.modelValue,
    endTime
  })
}
</script>

<template>
  <div class="timestamps-input">
    <TimeInput
      class="input"
      :modelValue="props.modelValue.startTime"
      @update:modelValue="updateStartTime"
    />
    <TimeInput :modelValue="props.modelValue.endTime" @update:modelValue="updateEndTime" />
  </div>
</template>

<style scoped>
.timestamps-input .input {
  margin-bottom: 5px;
}
</style>
