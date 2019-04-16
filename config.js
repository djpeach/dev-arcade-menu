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
  this.tileWidth = ops.tileWidth
  this.tileHeight = ops.tileHeight
}

export default config