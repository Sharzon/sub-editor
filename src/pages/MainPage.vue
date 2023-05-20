<script setup>
import { reactive } from 'vue'
import { readSubtitleFromInput } from '../utils'
import SubEditor from '../components/SubEditor.vue'

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
</script>

<template>
  <main>
    <label for="original">Original subtitle file</label>
    <input type="file" id="original" @change="addOriginal" />
    <label for="translated">Translated subtitle file</label>
    <input type="file" id="translated" @change="addTranslated" />
    <SubEditor :subtitles="subtitles" />
  </main>
</template>

<style scoped></style>
