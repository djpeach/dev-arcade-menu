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
  }

  createGames() {
    let excludeDirs = [
        '.DS_Store',
        '.git'
    ]
    fs.readdirSync(config.gamesDir)
        .filter(dir => excludeDirs.indexOf(dir) < 0)
        .forEach(dir => {
          let metadata = JSON.parse(fs.readFileSync(`${config.gamesDir}${dir}/metadata.json`, 'utf8'))
          this.games.push(new Game(metadata))
        })
  }

  showGames() {
    this.games.forEach(game => {
      console.log(indexToCoords(this.games.indexOf(game)))
    })
  }
}

export default Menu