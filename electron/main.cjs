// 控制应用生命周期和创建原生浏览器窗口的模组
const { app, BrowserWindow, ipcMain } = require('electron')

// main只能是cjs文件不能是ts或js
// ts文件使用cjs导入无法获取类型支持,只有es6导入才行
// 虽然在maints中使用es6导入可以获取ts支持,但会导致无法读取入口文件
// 所以尽量使用main.cjs
// import { app, BrowserWindow } from 'electron'

const path = require('path')

const ELECTRON_ENV = process.env.ELECTRON_ENV

// createWindow是一个主进程
// new BrowserWindow则是渲染进程
// 主进程只能有一个,但渲染进程可以有多个,每一个new BrowserWindow都创建了一个新的渲染进程
const createWindow = () => {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1500,
    height: 800,
    // 用于设置窗口的背景颜色
    backgroundColor: 'pink',
    // show: false,
    webPreferences: {
      // 渲染进程中是不允许使用nodejs的
      // 想要使用必须打开下面两个配置
      // 允许在窗口中使用 Node.js 的 API
      // nodeIntegration: true,
      // 关闭主进程和渲染进程的隔离
      // contextIsolation: false
      // 但是这样做事不安全的,开发中一般不会这样做

      // 所以可以使用预加载脚本
      // 每一渲染进程都可以给它配置一个预加载脚本(现在叫沙箱)
      // 指定预加载脚本
      // 预加载脚本也如开头所说的一样
      preload: path.join(__dirname, 'preload.cjs'),
      // 20版本后所有的渲染进程都会采用沙盒模式所以无法使用
      // 只能下面这样才能在预加载中使用nodejs
      sandbox: false
    }
  })

  // 加载 index.html
  // mainWindow.loadFile('dist/index.html') 将该行改为下面这一行，加载url
  // 注意loadFile和loadURL是互斥的
  mainWindow.loadURL(
    ELECTRON_ENV === 'dev'
      ? 'http://localhost:9527'
      :`file://${path.join(__dirname, '../dist/index.html')}`
  );

  // 打开开发工具
  if (ELECTRON_ENV === "dev") {
    mainWindow.webContents.openDevTools()
  }

  // 等待加载的操作
  // 先将show设置为false,不打开窗口
  // 然后在这个生命周期中等待页面加载完毕再通过show()打开
  // 这样便可以做其他的等待效果了
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  // macOS的适配
  app.on('activate', () => {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// macOS的适配
// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 在这个文件中，你可以包含应用程序剩余的所有部分的代码，
// 也可以拆分成几个文件，然后用 require 导入。

/* 笔记 */

// 警告问题
// 打包后出现安全警报可以尝试在index.html文件头中加入
// <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline'">
// 来设置本地资源引入的警告消除
// 或者直接在createWindow里给它所有警告消除(不提倡)
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

// 从渲染进程拿值
// 过程是先在主进程(也就是这里)用ipcMain.handle定义一个接收的函数
// 然后再渲染进程的预加载文件(preload)中去通过ipcRenderer.invoke拿到这个test-event
// 函数然后挂载到win上给渲染页面(vue)使用
// 最后在渲染页面(vue)上就可以通过;(window as any).electronApi.testR('参数')
// 的方式来使用了
// 其实就是发布订阅这样
const somePromise = (...args) => Promise.resolve(args)
ipcMain.handle('test-event', async (event, ...args) => {
  const result = await somePromise(...args)
  console.log('result-M :>> ', result)
  // 如果在这里做返回,便可以在preload中接收到
  // 可以用于在主进程中处理数据又返回回去
  return result
})

// 几个electron类似生命周期的api
app.on('before-quit', (e) => {
  console.log('应用开始关闭窗口之前触发 :>>', e)
})

app.on('browser-window-blur', (e) => {
  console.log('窗口失去焦点触发 :>>', e)
})

app.on('browser-window-focus', (e) => {
  console.log('窗口获得焦点触发 :>>', e)
})

// 让对应的窗口关闭
// 真正的关闭,mac中也会直接关闭
// app.quit()

// 获取文件目录
console.log('桌面目录 :>> ', app.getPath('desktop'))
console.log('音乐目录 :>> ', app.getPath('music'))
console.log('临时文件目录 :>> ', app.getPath('temp'))
console.log('用户目录 :>> ', app.getPath('userData'))