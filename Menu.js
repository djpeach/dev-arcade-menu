import config from './config'
import fs     from 'fs'
import Engine from './Engine'
import Game   from "./Game"
import { indexToCoords } from './utils'

class Menu {
  constructor(ctx) {
    this.ctx = ctx
    this.engine = new Engine(this.ctx)
    this.games = []
    this.createGames()
    this.showGames()
    this.selectedGame = null
  }

  createGames() {
    let i = 0
    let excludeDirs = [
        '.DS_Store',
        '.git'
    ]
    fs.readdirSync(config.gamesDir)
        .filter(dir => excludeDirs.indexOf(dir) < 0)
        .forEach(dir => {
          let metadata = JSON.parse(fs.readFileSync(`${config.gamesDir}${dir}/metadata.json`, 'utf8'))
          let coords = indexToCoords(i)
          this.games.push(new Game(metadata, coords))
          i++
        })
    this.selectedGame = this.games[0]
  }

  showGames() {
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(this.selectedGame.coords.x - 10, this.selectedGame.coords.y - 10, config.tileWidth - 40, config.tileHeight - 40)
    this.games.forEach(game => {
      console.log(game.coords)
      this.ctx.fillStyle = game.backgroundColor
      this.ctx.fillRect(game.coords.x, game.coords.y, config.tileWidth - 60, config.tileHeight - 60)
      this.ctx.fillStyle = 'white'
      this.ctx.font = "30px Arial"
      this.ctx.fillText(game.title, game.coords.x + 10, game.coords.y + 40)
    })
  }
}

export default Menu