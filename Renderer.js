import config, {init} from './config'
import Menu           from "./Menu";

class Renderer {
  constructor() {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    let height = document.getElementById('canvasBox').clientHeight
    let width = document.getElementById('canvasBox').clientWidth
    this.canvas.height = height
    this.canvas.width = width
    this.canvas.imageSmoothingEnabled = false
    init({
      tileHeight: height / config.rows,
      tileWidth: width / config.cols
    })
    new Menu(this.ctx)
  }
}

new Renderer()