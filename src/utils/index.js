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
