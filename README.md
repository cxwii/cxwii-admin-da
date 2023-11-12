## cxwii-Admin-da
```
一款开箱即用,符合直觉的cms解决方案,却不限于cms的一款集成解决方案(桌面版)
适用于各类管理系统,找寻各类解决方案,各类插件demo,作用于项目启动框架
```

## 安装依赖
```
pnpm install
```

## 依赖问题解决方案
```
electron和electron-build都因为墙的问题很难安装,所以最优的解决办法就是给他们单独设置淘宝镜像,找到.npmrc(C:\Users\XXX\.npmrc)然后在最下面复制粘贴这两行就可以一劳永逸的解决问题了
ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
ELECTRON_BUILDER_BINARIES_MIRROR=https://npmmirror.com/mirrors/electron-builder-binaries/
```

## 运行dev环境
```
pnpm run dev
```

## 命令说明
```
dev // 运行dev环境
dev:vite // 用于支持dev(不用单独运行)
dev:electron // 用于支持dev(不用单独运行)
build // 打包vite(生成dist)
electron:build // 打包生成electron安装包(额外还会打包dist)
electron // 想要测试dist时,就先执行build打包vite再执行这个命令
```