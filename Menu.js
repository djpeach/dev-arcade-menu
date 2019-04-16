import config from './config'
import fs     from 'fs'
import Engine from './Engine'
import Game   from "./Game"
import { indexToCoords } from './utils'

class Menu {
  constructor(ctx) {
    this.ctx = ctx
    this.engine = new Engine(this.ctx)
    this.engine.update = this.update
    this.engine.draw = this.draw
    this.games = []
    this.createGames()
    this.showGames()
    this.messager = this.engine.messager
    this.messager.subscribe(this)
    this.engine.startUp()
    this.top = 0
    this.nextTop = 0
    this.lastGame = config.cols * config.rows
    this.pagingDirection = -1
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
          this.games.push(new Game(`${config.gamesDir}${dir}`, metadata, coords))
          i++
        })
    this.selectedGame = this.games[0]
  }

  showGames() {
    if(this.top > this.nextTop) {
      this.top -= config.tileHeight / config.pagineIncrementPercent
    } else if (this.top < this.nextTop) {
      this.top += config.tileHeight / config.pagineIncrementPercent
    }
    if (this.games.filter(game => game.depsInstalled).length > 0) {
      if (this.selectedGame) {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(this.selectedGame.coords.x - 10, this.selectedGame.coords.y - 10 + this.top, config.tileWidth - 40, config.tileHeight - 40)
      }
    } else {
      this.ctx.fillStyle = 'white'
      this.ctx.font = '60px Arial'
      this.ctx.fillText("Loading Menu...", 50, 120)
    }
    this.games.filter(game => game.depsInstalled)
      .forEach(game => {
      this.ctx.fillStyle = game.backgroundColor
      this.ctx.fillRect(game.coords.x, game.coords.y + this.top, config.tileWidth - 60, config.tileHeight - 60)
      this.ctx.fillStyle = 'white'
      this.ctx.font = "30px Arial"
      this.ctx.fillText(game.title, game.coords.x + 10, game.coords.y + 40 + this.top)
    })
  }

  handleMsg(msg) {
    switch (msg.type) {
      case config.messageTypes.keyDown:
        let curIndex = this.games.indexOf(this.selectedGame)
          let nextIndex
        switch(msg.keyCode) {
          case 87:
            nextIndex = curIndex - 3 >= 0 ? curIndex - 3 : curIndex
            if (nextIndex < this.lastGame - (config.cols * config.rows)) {
              this.lastGame -= 3
              this.nextTop = this.top + config.tileHeight
            }
            this.selectedGame = this.games[nextIndex]
            break
          case 83:
            nextIndex = curIndex + 3 < this.games.length ? curIndex + 3 : curIndex
            if (nextIndex + 1 > this.lastGame) {
              this.lastGame += 3
              this.nextTop = this.top - config.tileHeight
            }
            this.selectedGame = this.games[nextIndex]
            break
          case 65:
            if (curIndex % config.cols === 0) {
              nextIndex = curIndex + 2
              this.selectedGame = this.games[nextIndex]
            } else {
              let nextIndex = curIndex - 1
              this.selectedGame = this.games[nextIndex]
            }
            break
          case 68:
            if ((curIndex + 1) % config.cols === 0) {
              nextIndex = curIndex - 2
              this.selectedGame = this.games[nextIndex]
            } else {
              let nextIndex = curIndex + 1
              this.selectedGame = this.games[nextIndex]
            }
            break
          case 191:
            this.selectedGame.execute()
        }
    }
  }

  update = () => {

  }

  draw = () => {
    this.ctx.fillStyle = 'grey'
    this.ctx.fillRect(0, 0, config.canvasWidth, config.canvasHeight)
    this.showGames()
  }
}

export default Menu