<script setup>
import { computed } from 'vue'
const props = defineProps({
  modelValue: {
    required: true,
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])

const time = computed({
  get() {
    const [hours, minutes, secondsAndMilliseconds] = props.modelValue.split(':')
    const [seconds, milliseconds] = secondsAndMilliseconds.split(',')
    return {
      hours,
      minutes,
      seconds,
      milliseconds
    }
  },
  set(newValue) {
    const { hours, minutes, seconds, milliseconds } = newValue
    emit('update:modelValue', `${hours}:${minutes}:${seconds},${milliseconds}`)
  }
})

const updatePart = (event, partName) => {
  time.value = {
    ...time.value,
    [partName]: event.target.value
  }
}
</script>

<template>
  <div class="time-input">
    <input type="number" min="0" max="99" :value="time.hours" @input="updatePart('hours')" />
    :
    <input type="number" min="0" max="59" :value="time.minutes" @input="updatePart('minutes')" />
    :
    <input type="number" min="0" max="59" :value="time.seconds" @input="updatePart('seconds')" />
    ,
    <input
      type="number"
      min="0"
      max="999"
      :value="time.milliseconds"
      @input="($event) => updatePart($event, 'milliseconds')"
    />
  </div>
</template>

<style scoped>
.time-input {
  display: flex;
  border: 1px solid var(--border-color);
  border-radius: 5px;
}
.time-input input {
  border: none;
  text-align: center;

  font: inherit;
  font-size: inherit;
}

.time-input input:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.time-input input:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.time-input input:last-child {
  border-right: none;
}
</style>
