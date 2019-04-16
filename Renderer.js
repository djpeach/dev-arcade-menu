import config, {init} from './config'

class Renderer {
  constructor() {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.sideLength = document.getElementById('canvasBox').clientHeight
    this.canvas.height = this.sideLength
    this.canvas.width = this.sideLength // square canvas
    this.canvas.imageSmoothingEnabled = false
    init({})
  }
}

new Renderer()