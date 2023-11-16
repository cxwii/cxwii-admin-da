// 控制应用生命周期和创建原生浏览器窗口的模组
const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  globalShortcut,
  Menu,
  Tray,
  nativeImage
} = require('electron')

// 保存窗口状态
const windowStateKeeper = require('electron-window-state')

// 创建自定义的顶部菜单
// 然后要用setApplicationMenu插入到顶部菜单
const mainMenu = (data) => {
  return Menu.buildFromTemplate([
    {
      label: '自定义菜单',
      submenu: [
        {
          label: '子菜单1',
          submenu:[
            {
              label: '子菜单1的嵌套菜单1'
            },
            {
              label: '子菜单1的嵌套菜单2'
            }
          ]
        },
        {
          label: '子菜单2'
        },
        {
          label: '自定义的菜单事件',
          click: () => {
            console.log('自定义的菜单事件 :>> ', data)
          },
          accelerator: 'Shift+Alt+Q'
        }
      ]
    },
    // 也可以使用一些api提供的菜单
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }
      ]
    },
    {
      label: '调试栏',
      // role就是提供的内容
      role: 'toggleDevTools'
    },
    {
      label: '全屏',
      role: 'togglefullscreen'
    }
  ])
}

// 托盘
const creatTray = () => {
  // 版本更新后这个方式不能读取图片
  // const tray = new Tray('../src/assets/imgs/vuex-store.png')
  // tray.setToolTip('cxwii-admin-da')

  // 直接写路径不行,要这样写
  const icon = nativeImage.createFromPath(path.join(__dirname, '../src/assets/imgs/vuex-store.png'))
  const tray = new Tray(icon)
  tray.setToolTip('cxwii-admin-da')
}

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
  const winState = windowStateKeeper({
    // 可以默认也可以自己设置个初始值
    defaultWidth: 1500,
    defaultHeight: 800
  })

  // 创建托盘
  creatTray()
  
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: winState.width,
    height: winState.height,
    x: winState.x, // 设置窗口位置
    y: winState.y, // 设置窗口位置
    // backgroundColor: 'pink', // 用于设置窗口的背景颜色
    // show: false, // 不允许窗口打开
    /*
      一般会自己定义一个顶部框来代替原生的顶部框
      然后给那个顶部框设置下面的样式就可以模拟拖动窗口
      user-select: none; 让文本不可选中
      -webkit-app-region: drag; 指定为可拖动(在这个el元素内都可以拖动)
    */
    // frame: false, // 让窗口成为无边框窗口(没有顶部栏)
    // titleBarStyle: 'hidden', // mac里面并且当frame为false时,显示红绿灯
    // titleBarOverlay: true, // win里面要显示红绿灯(控制栏)就还要加上这个
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

  // 设置electron-win-state管理那个窗口(一定要设置不然不起效果)
  winState.manage(mainWindow)

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

  // 页面全部加载完毕触发(是浏览器的页面)
  mainWindow.webContents.on('did-finish-load', (e) => {
    console.log('浏览器页面全部加载完毕 :>> ', e)
  })

  // 这个浏览器dom加载完毕时触发(会先于前面那个,因为dom加载完毕并不一定资源也加载完了)
  mainWindow.webContents.on('dom-ready', (e) => {
    console.log('浏览器dom加载完毕 :>> ', e)
  })

  // 顾名思义,打开一个新窗口触发
  // 在 Electron 22 已移除
  // mainWindow.webContents.on('new-window', (e) => {
  //   console.log('打开一个新窗口 :>> ', e)
  // })
  // 替换为
  // mainWindow.webContents.setWindowOpenHandler((details) => {
  //   console.log('打开一个新窗口 :>> ', details)
  //   // 它会覆盖打开新窗口的操作,然后自己来书写
  //   // details里面有新窗口信息,然后用api来打开新窗口
  // })

  // 右键的上下文菜单事件
  mainWindow.webContents.on('context-menu', (e, params) => {
    // console.log('上下文菜单e :>> ', e)
    // console.log('上下文菜单params :>> ', params)

    // 注入一段js代码(小果汁你的想法很危险啊)
    // mainWindow.webContents.executeJavaScript(`alert('hi !!')`)

    // 系统级窗口的api
    // // 打开一个文件选取窗口
    // dialog.showOpenDialog({
    //   buttonLabel: '选择',
    //   // 打开窗口的路径
    //   defaultPath: app.getPath('desktop'),
    //   // 设置选取规则
    //   // openFile - 允许选择文件
    //   // openDirectory - 允许选择文件夹
    //   // multiSelections-允许多选。
    //   // showHiddenFiles-显示对话框中的隐藏文件。
    //   // createDirectory macOS -允许你通过对话框的形式创建新的目录。
    //   // promptToCreate Windows-如果输入的文件路径在对话框中不存在, 则提示创建。 这并不是真的在路径上创建一个文件，而是允许返回一些不存在的地址交由应用程序去创建。
    //   // noResolveAliases macOS-禁用自动的别名路径(符号链接) 解析。 所选别名现在将会返回别名路径而非其目标路径。
    //   // treatPackageAsDirectory macOS -将包 (如 .app 文件夹) 视为目录而不是文件。
    //   // dontAddToRecent Windows - 不要将正在打开的项目添加到最近的文档列表中。
    //   properties: ['multiSelections', 'createDirectory', 'openFile', 'openDirectory']
    // }).then((res) => {
    //   console.log('showOpenDialog :>> ', res)
    // })

    // // 打开文件保存窗口
    // dialog.showSaveDialog({

    // }).then((res) => {
    //   console.log('showSaveDialog :>> ', res)
    // })

    // 打开一个自定义的窗口
    // 这个buttonsData如果你再最前面加个空格会导致第二个值丢失[ 'yse', 'no', 'maybe', 'test']
    // -----------------------------------------------------↑就这里加多个空格
    // 这bug太离谱了吧
    // 好像还和yse和no有关,win是默认这两个的按钮的,出现这两个再加上有空格就会出问题
    // const buttonsData = [ '确定', '取消', '等等']
    // dialog.showMessageBox({
    //   title: '选择窗口',
    //   message: '选择一个窗口',
    //   detail: '选择的内容',
    //   buttons: buttonsData
    // }).then((res) => {
    //   console.log('showMessageBox :>> ', res)
    // })

    // mainMenu不仅仅可以作为顶部菜单插入,也可以作为其他菜单
    // mainMenu只是一个通用的菜单项
    mainMenu().popup()
  })

  // 等待加载的操作
  // 先将show设置为false,不打开窗口
  // 然后在这个生命周期中等待页面加载完毕再通过show()打开
  // 这样便可以做其他的等待效果了
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // // 父子窗口关系
  // const winTow = new BrowserWindow({
  //   width: 600,
  //   height: 500,
  //   // 这个可以指定父窗口
  //   parent: mainWindow,
  //   // 在作为子窗口时可以设置,将子窗口变作模态窗口
  //   // win和mac逻辑不一样,开发时要注意(好吧我承认我是穷逼,我没用过mac T-T)
  //   modal: true
  // })
  // // 随便挂载个网页
  // winTow.loadURL('http://baidu.com')

  // 监听键名
  // globalShortcut.register('F', () => {
  //   console.log('监听F键 :>> ')
  // })

  // 自定义的顶部菜单插入到顶部菜单
  Menu.setApplicationMenu(mainMenu('参数'))

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
    // getAllWindows获取当前窗口个数
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

// // 几个electron类似生命周期的api
// app.on('before-quit', (e) => {
//   console.log('应用开始关闭窗口之前触发 :>>', e)
// })

// app.on('browser-window-blur', (e) => {
//   console.log('窗口失去焦点触发 :>>', e)
// })

// app.on('browser-window-focus', (e) => {
//   console.log('窗口获得焦点触发 :>>', e)
// })

// 让对应的窗口关闭
// 真正的关闭,mac中也会直接关闭
// app.quit()

// 获取文件目录
console.log('桌面目录 :>> ', app.getPath('desktop'))
console.log('音乐目录 :>> ', app.getPath('music'))
console.log('临时文件目录 :>> ', app.getPath('temp'))
console.log('用户目录 :>> ', app.getPath('userData'))