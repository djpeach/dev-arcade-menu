import config from './config'

class Game {
  constructor(metadata, coords) {
    this.title = metadata.title
    this.author = metadata.author
    this.language = metadata.language
    this.install_script = metadata.install_script
    this.command = metadata.command
    this.backgroundColor = metadata.backgroundColor || config.backgroundColors.pop()
    this.coords = coords
    this.coords.x = this.coords.x + 30
    this.coords.y = this.coords.y + 30
  }
}

export default Game