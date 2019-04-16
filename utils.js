import config from './config'

export function indexToCoords(index) {
  return {
    x: (index % config.cols) * config.tileWidth,
    y: Math.floor(index / config.cols) * config.tileHeight
  }
}