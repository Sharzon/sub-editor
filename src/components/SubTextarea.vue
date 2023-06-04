<script setup>
import { defineProps, defineEmits, ref, nextTick } from 'vue'
import GrowableTextarea from './GrowableTextarea.vue';

const props = defineProps({
  subtitleText: {
    required: true,
    type: String,
  },
})
const emit = defineEmits(['update:subtitleText'])

const textareaRef = ref(null)
const editing = ref(false)
const editedSubtitleText = ref(props.subtitleText)

const startEdit = async () => {
  if (!editing.value) {
    editing.value = true
    editedSubtitleText.value = props.subtitleText
    await nextTick()
    textareaRef.value.focus()
  }
}
const stopEdit = () => {
  editing.value = false
  emit('update:subtitleText', editedSubtitleText.value)
}
const onInput = (event) => {
  editedSubtitleText.value = event.target.value
}
</script>

<template>
  <div class="sub-textarea" @click="startEdit">
    <GrowableTextarea
      v-if="editing"
      ref="textareaRef"
      class="sub-textarea__textarea"
      :modelValue="editedSubtitleText"
      placeholder="Type translation here..."
      @input="onInput"
      @blur="stopEdit"
    />
    <div v-else class="sub-textarea__text">{{ props.subtitleText }}</div>
  </div>
</template>

<style scoped>
.sub-textarea {
  padding: 5px;
}

.sub-textarea__textarea {
  width: 100%;
  height: 100%;
  border: 1px solid #117b4d;
  border-radius: 5px;
  resize: none; 

  font-family: inherit;
  font-size: inherit;
}
</style>
