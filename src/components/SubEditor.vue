<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  subtitles: {
    required: true
  }
})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Time</th>
        <th>Original text</th>
        <th>Translated text</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in props.subtitles.timestamps.length" :key="i - 1">
        <td>
          {{ props.subtitles.timestamps[i - 1].startTime }} -->
          {{ props.subtitles.timestamps[i - 1].endTime }}
        </td>
        <td>{{ props.subtitles.original[i - 1] }}</td>
        <td>{{ props.subtitles.translated[i - 1] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
