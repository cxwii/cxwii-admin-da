const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
  // 可以直接给个线上项目地址(就相当于套壳了)
  // win.loadURL('http://localhost:9527/')
}

app.whenReady().then(() => {
  createWindow()
})