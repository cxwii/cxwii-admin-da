const { contextBridge, ipcRenderer } = require('electron')

// 所有Node.js API都可以在预加载过程中使用。
// 它拥有与Chrome扩展一样的沙盒。
const fs = require('fs')
console.log('fs :>> ', fs)

// 从渲染进程拿值
const testR = async (...args) => {
  const result = await ipcRenderer.invoke('test-event', ...args)
  console.log('result-R :>> ', result)
}

// 这个文件给渲染进程(vue项目)中的文件传值
// 其实就是给渲染进程的沙盒win上加内容
contextBridge.exposeInMainWorld('electronApi', {
  platform: process.platform,
  testR
})
