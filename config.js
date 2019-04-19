let config =  {
  gamesDir: '../dev-arcade-games/',
  messageTypes: {
    keyDown: 'KEY_DOWN',
    keyUp: 'KEY_UP'
  },
  rows: 2,
  cols: 3,
  pagineIncrementPercent: 15,
  loadingDotsDelta: 20,
  loadingDotsMax: 5
}

export const init = (ops) => {
  config.tileWidth = ops.tileWidth
  config.tileHeight = ops.tileHeight
  config.canvasWidth = ops.canvasWidth
  config.canvasHeight = ops.canvasHeight
}

export default config