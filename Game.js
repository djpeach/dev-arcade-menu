class Game {
  constructor(metadata) {
    this.title = metadata.title
    this.author = metadata.author
    this.language = metadata.language
    this.install_script = metadata.install_script
    this.command = metadata.command
  }
}

export default Game