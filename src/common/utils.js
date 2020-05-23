export const entities = {
  '&#039;': '\'',
  '&quot;': '"',
  '&ldquo;': '"',
  '&hellip;': '...',
  '&rdquo;': '"'
}

const formatString = (str) => str.replace(/&#?\w+;/gi, match => entities[match])
export default formatString
