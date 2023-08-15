<script setup>
import { RouterView } from 'vue-router'
import logo from './components/logo.vue'
import { useToDoStore } from './stores/todosStore'
const store = useToDoStore()

const onCreateTodo = () => {
  store.createToggleAction(true)
}
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="wrapper">
        <logo />
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="onCreateTodo"
          :disabled="store.createToggle"
        >
          create ToDo
        </button>
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
  justify-content: space-between;
}
</style>
