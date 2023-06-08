<script setup>
import { reactive } from 'vue'
import { readSubtitleFromInput, translationToSrt } from '../utils'
import SubEditor from '../components/SubEditor.vue'
import FileInput from '../components/FileInput.vue'
import Button from '../components/SEButton.vue'

const subtitles = reactive({
  timestamps: [],
  original: [],
  translated: []
})

const addOriginal = async (event) => {
  const newSubs = await readSubtitleFromInput(event)
  addSubs('original', newSubs)
}

const addTranslated = async (event) => {
  const newSubs = await readSubtitleFromInput(event)
  addSubs('translated', newSubs)
}

const saveTranslated = () => {
  const srt = translationToSrt(subtitles.timestamps, subtitles.translated)
  const blob = new Blob([srt], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.download = 'translation.srt'
  link.href = url
  link.click()

  URL.revokeObjectURL(url)
}

const addSubs = (type, newSubs) => {
  const key = type === 'original' ? 'original' : 'translated'
  const correspondingKey = key === 'original' ? 'translated' : 'original'

  let i = 0
  let j = 0
  while (i < subtitles.timestamps.length || j < newSubs.length) {
    const currentTimestamp = subtitles.timestamps[i]
    const newSub = newSubs[j]
    if (!currentTimestamp || currentTimestamp.startSeconds > newSub.startSeconds) {
      const newTimestamp = {
        startTime: newSub.startTime,
        startSeconds: newSub.startSeconds,
        endTime: newSub.endTime,
        endSeconds: newSub.endSeconds
      }
      subtitles.timestamps.splice(i, 0, newTimestamp)
      subtitles[key].splice(i, 0, newSub.text)
      subtitles[correspondingKey].splice(i, 0, '')
      i++
      j++
    } else if (currentTimestamp.startSeconds < newSub.startSeconds) {
      i++
    } else {
      subtitles[key][i] = newSub.text
      i++
      j++
    }
  }
}

const updateTranslation = ({ index, text }) => {
  text = text ? text.trim() : ''
  subtitles.translated.splice(index, 1, text)
}

const updateTimestamp = ({ index, timestamp }) => {
  subtitles.timestamps.splice(index, 1, timestamp)
}
</script>

<template>
  <div class="main-page">
    <div class="menu">
      <FileInput
        class="file-input"
        label="Add original subtitle"
        accept=".srt"
        @addFile="addOriginal"
        id="original-file"
      />
      <FileInput
        class="file-input"
        label="Add translation subtitle"
        accept=".srt"
        @addFile="addTranslated"
        id="translated-file"
      />
      <Button class="save-button" text="Save translation" @click="saveTranslated" />
    </div>
    <main class="content">
      <h1>Subtitles editor</h1>
      <SubEditor
        :subtitles="subtitles"
        @update:translation="updateTranslation"
        @update:timestamp="updateTimestamp"
      />
    </main>
  </div>
</template>

<style scoped>
.main-page {
  display: flex;
  padding: 20px 0;
}
.menu {
  display: flex;
  width: 300px;
  margin-right: 20px;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  height: 100%;
}

.file-input,
.save-button {
  margin-bottom: 10px;
}

.content {
  width: 100%;
}
</style>
