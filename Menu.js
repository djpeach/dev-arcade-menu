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
    this.lastGameIndex = config.cols * config.rows
    this.loadingGame = false
    this.loadingDots = ". "
    this.framesPassed = 0
    this.showingMessage = false
    this.message = ""
    this.framesShowedMessage = 0
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
          let logo = null
          if (metadata.logo) {
            logo = document.createElement('img')
            logo.src = `${config.gamesDir}${dir}/${metadata.logo}`
          }
          this.games.push(new Game(`${config.gamesDir}${dir}`, metadata, coords, logo))
          i++
        })
    this.selectedGame = this.games[0]
  }

  showMessage() {
    this.ctx.fillStyle = 'white'
    this.ctx.font = "60px Arial"
    this.ctx.fillText(this.message, 50, 120, config.canvasWidth - 100)
    this.framesShowedMessage++
    if (this.framesShowedMessage > 100) {
      this.showingMessage = false
      this.framesShowedMessage = 0
      this.message = ""
    }
  }

  showGames() {
    if (this.loadingGame) {
      this.ctx.fillStyle = 'white'
      this.ctx.font = "60px Arial"
      this.calcLoadingDots()
      this.ctx.fillText(`Loading Game: ${this.selectedGame.title}${this.loadingDots}`, 50, 120, config.canvasWidth - 100)
    } else {
      if(this.top > this.nextTop) {
        let topDiff = config.tileHeight / config.pagineIncrementPercent
        this.top = this.top - topDiff >= this.nextTop ? this.top - topDiff : this.nextTop
      } else if (this.top < this.nextTop) {
        let topDiff = config.tileHeight / config.pagineIncrementPercent
        this.top = this.top + topDiff <= this.nextTop ? this.top + topDiff : this.nextTop
      }
      if (this.games.filter(game => game.depsInstalled).length === this.games.length) {
        this.loadingDots = ""
        if (this.selectedGame) {
          this.ctx.fillStyle = 'white'
          this.ctx.fillRect(this.selectedGame.coords.x - 10, this.selectedGame.coords.y - 10 + this.top, config.tileWidth - 40, config.tileHeight - 40)
        }
        this.games.filter(game => game.depsInstalled)
            .forEach(game => {
              this.ctx.fillStyle = game.backgroundColor
              this.ctx.fillRect(game.coords.x, game.coords.y + this.top, config.tileWidth - 60, config.tileHeight - 60)
              if (game.logo) {
                let logoHeight = game.logo.height
                let logoWidth = game.logo.width
                let drawnHeight = (config.tileWidth - 60) * logoHeight / logoWidth
                this.ctx.imageSmoothingEnabled = false
                this.ctx.drawImage(game.logo, game.coords.x, game.coords.y + this.top + (config.tileHeight - drawnHeight) - 60, (config.tileWidth - 60), drawnHeight)
              }
              this.ctx.fillStyle = 'white'
              this.ctx.fillRect(game.coords.x, game.coords.y + this.top, config.tileWidth - 60, 50)
              this.ctx.fillStyle = 'black'
              this.ctx.font = "30px Arial"
              this.ctx.fillText(game.title, game.coords.x + 10, game.coords.y + 40 + this.top, config.tileWidth - 90)
            })
      } else {
        this.ctx.fillStyle = 'white'
        this.ctx.font = '60px Arial'
        this.calcLoadingDots()
        this.ctx.fillText(`Loading Menu${this.loadingDots}`, 50, 120, config.canvasWidth - 100)
      }
    }
  }

  calcLoadingDots() {
    this.framesPassed++
    if (this.framesPassed % config.loadingDotsDelta === 0) {
      this.loadingDots = `${this.loadingDots}. `
    }
    if (this.framesPassed > (config.loadingDotsDelta * (config.loadingDotsMax - 1) + (config.loadingDotsDelta - 1))) {
      this.loadingDots = ". "
      this.framesPassed = 0
    }
  }

  handleMsg(msg) {
    let xOppositeDelta = config.cols - 1
    switch (msg.type) {
      case config.messageTypes.keyDown:
        let curIndex = this.games.indexOf(this.selectedGame)
          let nextIndex
        switch(msg.keyCode) {
          case 87: // ^ up
            nextIndex = curIndex - config.cols >= 0 ? curIndex - config.cols : curIndex
            if (nextIndex < this.lastGameIndex - (config.cols * config.rows)) {
              this.lastGameIndex -= config.cols
              this.nextTop = this.nextTop + config.tileHeight
            }
            this.selectedGame = this.games[nextIndex]
            break
          case 83: // \/ down
            if (curIndex + config.cols < this.games.length) {
              nextIndex = curIndex + config.cols
            } else {
              nextIndex = this.games.length - 1
            }
            if (nextIndex + 1 > this.lastGameIndex) {
              this.lastGameIndex += config.cols
              this.nextTop = this.nextTop - config.tileHeight
            }
            this.selectedGame = this.games[nextIndex]
            break
          case 65: // < left
            if (curIndex % config.cols === 0) {
              if (curIndex + xOppositeDelta < this.games.length) {
                nextIndex = curIndex + xOppositeDelta
                this.selectedGame = this.games[nextIndex]
              } else {
                nextIndex = this.games.length - 1
                this.selectedGame = this.games[nextIndex]
              }
            } else if (curIndex - 1 >= 0) {
              let nextIndex = curIndex - 1
              this.selectedGame = this.games[nextIndex]
            }
            break
          case 68: // > right
            if ((curIndex + 1) % config.cols === 0) {
              nextIndex = curIndex - xOppositeDelta
              this.selectedGame = this.games[nextIndex]
            } else if (curIndex === this.games.length - 1) {
              nextIndex = curIndex - (curIndex % config.cols)
              this.selectedGame = this.games[nextIndex]
            } else if (curIndex + 1 < this.games.length) {
              let nextIndex = curIndex + 1
              this.selectedGame = this.games[nextIndex]
            }
            break
          case 49:
            if (!this.selectedGame.start1) {
              this.showingMessage = true
              this.message = `${this.selectedGame.title} does not have a single-player mode`
            } else {
              this.selectedGame.execute(1,() => {
                this.loadingGame = false
                this.loadingDots = ""
              })
              this.loadingGame = true
            }
            break
          case 50:
            if (!this.selectedGame.start2) {
              this.showingMessage = true
              this.message = `${this.selectedGame.title} does not have a 2-player mode`
            } else {
              this.selectedGame.execute(2,() => {
                this.loadingGame = false
                this.loadingDots = ""
              })
              this.loadingGame = true
            }
            break
          case 191:
            this.selectedGame.execute('/', () => {
              this.loadingGame = false
              this.loadingDots = ""
            })
            this.loadingGame = true
            break
        }
    }
  }

  update = () => {

  }

  draw = () => {
    this.ctx.fillStyle = 'grey'
    this.ctx.fillRect(0, 0, config.canvasWidth, config.canvasHeight)
    if(this.showingMessage) {
      this.showMessage()
    } else {
      this.showGames()
    }
  }
}

export default Menu