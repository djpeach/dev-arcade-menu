import config from './config'

export function indexToCoords(index) {
  return {
    x: (index % config.cols) * config.tileWidth,
    y: Math.floor(index / config.cols) * config.tileHeight
  }
}

export function generateBackgroundColor() {
  let color, letters = '0123456789ABCDEF'.split('')

  function addDigitToColor(limit) {
    color += letters[Math.round(Math.random() * limit )]
  }

  color = '#'
  addDigitToColor(12) // lower limit = darker color
  for (let i = 0; i < 5; i++) {
    addDigitToColor(15)
  }
  return color
}