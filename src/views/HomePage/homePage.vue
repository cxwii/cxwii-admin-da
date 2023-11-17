<script lang="ts" setup>
import { ref } from 'vue'

// 预加载文件传过来的值
console.log('electronApi :>> ', (window as any).electronApi.platform)
console.log('window :>> ', window)

// 传值给主进程
const test = () => {
  ;(window as any).electronApi.testR('参数1', '参数2')
}

// 拷贝api
const test2 = () => {
  ;(window as any).electronApi.myCopy1()
}
const test3 = () => {
  ;(window as any).electronApi.myCopy2()
}
const imgURL = ref()
const test4 = async () => {
  const url = await (window as any).electronApi.test4()
  imgURL.value = url
  console.log('图片地址 :>> ', url)
}
</script>

<template>
  <img :src="imgURL" />
  <el-button @click="test">test</el-button>
  <el-button @click="test2">test2</el-button>
  <el-button @click="test3">test3</el-button>
  <el-button @click="test4">test4</el-button>
</template>

<style scoped lang="scss"></style>
