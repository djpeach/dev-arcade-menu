import config from './config'

export function indexToCoords(index) {
  console.log(`${index}: ${Math.floor(index / config.rows)}`)
  return {
    x: (index % config.cols) * config.tileWidth,
    y: Math.floor(index / config.cols) * config.tileHeight
  }
}