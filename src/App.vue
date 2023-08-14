<script setup>
import { RouterLink, RouterView } from 'vue-router'

import logo from './components/logo.vue'
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="wrapper">
        <logo />
        <nav>
          <RouterLink to="/">Home</RouterLink>
        </nav>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
.header {
  border-bottom: 1px solid #7b61ff;
  background: #fefcff;
  /* padding: 20px; */
  padding-top: 20px;
  padding-bottom: 20px;
}
.wrapper {
  display: flex;
}
</style>
