class Game {
  constructor(metadata, coords, number) {
    this.title = metadata.title
    this.author = metadata.author
    this.language = metadata.language
    this.install_script = metadata.install_script
    this.command = metadata.command
    this.coords = coords
    this.number = number
  }
}

export default Game