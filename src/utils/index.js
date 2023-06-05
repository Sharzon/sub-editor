import SrtParser2 from 'srt-parser-2'

export const readFileFromInput = (event) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.readAsText(file)

  return new Promise((resolve) => {
    reader.onload = () => {
      resolve(reader.result)
    }
  })
}

export const readSubtitleFromInput = async (event) => {
  const parser = new SrtParser2()

  const subtitle = await readFileFromInput(event)
  return parser.fromSrt(subtitle)
}

export const translationToSrt = (timestamps, translated) => {
  const parser = new SrtParser2()
  const translation = timestamps.map((timestamp, index) => {
    return {
      id: timestamp.id ?? index + 1,
      startTime: timestamp.startTime,
      endTime: timestamp.endTime,
      text: translated[index]
    }
  })
  return parser.toSrt(translation)
}
