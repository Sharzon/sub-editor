<script setup>
import { defineEmits, defineProps, ref } from 'vue'

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
})

const textareaRef = ref(null)

defineExpose({
  focus: () => {
    textareaRef.value.focus()
  },
  blur: () => textareaRef.value && textareaRef.value.blur(),
})

</script>

<template>
  <div
    class="growable-textarea-wrapper"
    :data-value="props.modelValue"
  >
    <textarea
      class="growable-textarea"
      ref="textareaRef"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      @input="$event => emit('update:modelValue', $event.target.value)"
      @focus="() => emit('focus')"
      @blur="() => emit('blur')"
    />
  </div>
</template>

<style scoped>
  .growable-textarea-wrapper {
    display: grid;
  }

  .growable-textarea-wrapper::after {
    content: attr(data-value) ' ';
    visibility: hidden;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .growable-textarea {
    resize: none;
    overflow: hidden;
  }

  .growable-textarea,
  .growable-textarea-wrapper::after {
    border: 1px solid #117b4d;
    padding: 0.5rem;
    font: inherit;

    grid-area: 1 / 1 / 2 / 2;
  }
</style>
