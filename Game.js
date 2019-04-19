import config from './config'
import {spawn, exec} from 'child_process'
import {generateBackgroundColor} from './utils'

class Game {
  constructor(dir, metadata, coords, logo) {
    this.dir = dir
    this.title = metadata.title
    this.author = metadata.author
    this.language = metadata.language
    this.install_script = metadata.install_script
    this.start1 = metadata.start1 || null
    this.start2 = metadata.start2 || null
    this.command = metadata.command
    this.backgroundColor = metadata.backgroundColor || generateBackgroundColor()
    this.coords = coords
    this.logo = logo
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

  execute(startMode, cb) {
    let execution
    switch(startMode) {
      case 1:
        execution = exec(this.start1, {
          cwd: this.dir
        })
        break
      case 2:
        execution = exec(this.start2, {
          cwd: this.dir
        })
        break
      case '/':
        execution = exec(this.command, {
          cwd: this.dir
        })
    }

    execution.on('exit', () => {
      cb()
    })
  }
}

export default Game