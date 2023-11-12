<script setup lang="ts">
import { ref } from 'vue'

let dev: any

if (import.meta.env.VITE_API_BASEPATH == 'dev') {
  dev = 'dev'
} else if (import.meta.env.VITE_API_BASEPATH == 'pro') {
  dev = 'pro'
} else {
  dev = 'foo'
}

const test = () => {
  console.log('object :>> ', dev);
}

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button @click="test">test</button>
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a  
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
