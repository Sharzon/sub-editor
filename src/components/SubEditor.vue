<script setup>
import SubTextarea from './SubTextarea.vue'
import TimestampInput from './TimestampInput.vue'

const props = defineProps({
  subtitles: {
    required: true
  }
})
const emit = defineEmits(['update:translation'])
</script>

<template>
  <table class="sub-editor">
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
          <TimestampInput
            :modelValue="props.subtitles.timestamps[i - 1]"
            @update:modelValue="(timestamp) => emit('update:timestamp', { index: i - 1, timestamp })"
          />
        </td>
        <td>{{ props.subtitles.original[i - 1] }}</td>
        <td class="sub-editor__translation">
          <SubTextarea
            class="sub-editor__transtation-textarea"
            :subtitleText="props.subtitles.translated[i - 1]"
            @update:subtitleText="(text) => emit('update:translation', { index: i - 1, text })"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.sub-editor {
  display: grid;
  grid-template-columns: 250px 1fr 1fr;
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  border: 1px solid var(--border-color);
  border-radius: 5px;
}
.sub-editor thead,
.sub-editor tbody,
.sub-editor tr {
  display: contents;
}

.sub-editor th,
.sub-editor td {
  padding: 5px;
  border-right: none;
  border-bottom: none;
  text-align: left;
  vertical-align: top;
}

.sub-editor th,
.sub-editor td {
  display: block;
  border-right: 1px solid var(--border-color);
}

.sub-editor th:last-child,
.sub-editor td:last-child {
  border-right: none;
}

.sub-editor td {
  border-top: 1px solid var(--border-color);
}

.sub-editor .sub-editor__translation {
  padding: 0;
}

.sub-editor__transtation-textarea {
  min-height: 100%;
}
</style>
