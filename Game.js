import config from './config'
import {spawn, exec} from 'child_process'

class Game {
  constructor(dir, metadata, coords) {
    this.dir = dir
    this.title = metadata.title
    this.author = metadata.author
    this.language = metadata.language
    this.install_script = metadata.install_script
    this.command = metadata.command
    this.backgroundColor = metadata.backgroundColor || config.backgroundColors.pop()
    this.coords = coords
    this.coords.x = this.coords.x + 30
    this.coords.y = this.coords.y + 30
    this.depsInstalled = false
    this.installDeps()
  }

  installDeps() {
    const installation = exec(this.install_script, {
      cwd: this.dir
    })

    installation.on('exit', function(code, signal) {
      this.depsInstalled = true
    }.bind(this))
  }

  execute(cb) {
    const execution = exec(this.command, {
      cwd: this.dir
    })

    execution.on('exit', () => {
      cb()
    })
  }
}

export default Game