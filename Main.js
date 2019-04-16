const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow = null

class Main {
  constructor() {
    this.mainWindow = null;
    this.addListeners();
  }

  createWindow() {
    this.mainWindow = new BrowserWindow({
      fullscreen: true
    });

    this.mainWindow.loadFile('index.html')

    this.mainWindow.on('closed', function () {
      this.mainWindow = null;
    });

    this.mainWindow.show()

    // this.mainWindow.webContents.openDevTools()
  }

  addListeners() {
    app.on('ready', this.createWindow);

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', function () {
      if (this.mainWindow === null) {
        this.createWindow();
      }
    });
  }
}

new Main();