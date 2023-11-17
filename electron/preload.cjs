const { contextBridge, ipcRenderer, clipboard } = require('electron')

// 所有Node.js API都可以在预加载过程中使用。
// 它拥有与Chrome扩展一样的沙盒。
const fs = require('fs')
console.log('fs :>> ', fs)

// 从渲染进程拿值
const testR = async (...args) => {
  const result = await ipcRenderer.invoke('test-event', ...args)
  console.log('result-R :>> ', result)
}

// 拷贝api
const myCopy1 = async (...args) => {
  // 往剪切板里面写东西
  clipboard.writeText('hi----')
}

const myCopy2 = async (...args) => {
  // 读取剪切板里的东西
  console.log('剪切板里的东西 :>> ', clipboard.readText())
}

const test4 = async () => {
  const result = await ipcRenderer.invoke('getImg')
  console.log('result :>> ', result)
  for (const source of result) {
    if (source.name == '整个屏幕') {
      console.log('图片信息 :>> ', source.thumbnail)
      let myImg = source.thumbnail.crop({
        x: 0,
        y: 30,
        width: 1800,
        height: 1500
      })
      return myImg.toDataURL()
    }
  }
}

// 这个文件给渲染进程(vue项目)中的文件传值
// 其实就是给渲染进程的沙盒win上加内容
contextBridge.exposeInMainWorld('electronApi', {
  platform: process.platform,
  testR,
  myCopy1,
  myCopy2,
  test4
})
