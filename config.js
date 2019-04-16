let config =  {
  gamesDir: '../dev-arcade-games/',
  messageTypes: {
    keyDown: 'KEY_DOWN',
    keyUp: 'KEY_UP',
    gameOver: 'GAME_OVER'
  },
  rows: 2,
  cols: 3,
}

export const init = (ops) => {
  config.tileWidth = ops.tileWidth
  config.tileHeight = ops.tileHeight
}

export default config