let config =  {
  gamesDir: '../dev-arcade-games/',
  messageTypes: {
    keyDown: 'KEY_DOWN',
    keyUp: 'KEY_UP',
    gameOver: 'GAME_OVER'
  },
  rows: 2,
  cols: 3,
  backgroundColors: ["#403B4A", "#D76747", "#22CAD7", "#9F11D0", "#048BA8", "#D2584D", "#F49A43", "#072C3B", "#AE3D29", "#601B1E"]
}

export const init = (ops) => {
  config.tileWidth = ops.tileWidth
  config.tileHeight = ops.tileHeight
}

export default config