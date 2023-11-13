<script lang="ts" setup>
import { ref } from 'vue'

// 预加载文件传过来的值
console.log('electronApi :>> ', (window as any).electronApi.platform)
console.log('window :>> ', window)

// 传值给主进程
const test = () => {
  ;(window as any).electronApi.testR('参数1', '参数2')
}
</script>

<template>
  <el-button @click="test">test</el-button>
</template>

<style scoped lang="scss"></style>
