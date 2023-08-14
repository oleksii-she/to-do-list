<script setup>
import { ref, watchEffect, watch } from 'vue'

import formCreateTodo from '../components/formCreateTodo.vue'
import TodoList from '../components/todos/todoList.vue'
import { useToDoStore } from '../stores/todosStore'
import TodoItem from '../components/todos/todoItem.vue'
import ReviewToDo from '../components/reviewToDo.vue'

const store = useToDoStore()

const createTodo = ref(false)
const idTodo = ref(Number)
const ReviewToDoInfo = ref(null)

const clickId = (id) => {
  idTodo.value = Number(id)
}

const hideCreateTodo = () => {
  createTodo.value = !createTodo.value
}

const deleteId = async (id) => {
  if (!id) return

  await store.deleteToDoAction(id)
}

watchEffect(async () => {
  try {
    const toDo = await store.idToDoAction(idTodo.value)
    if (!toDo) {
      ReviewToDoInfo.value = ReviewToDoInfo
    }
    ReviewToDoInfo.value = toDo
  } catch (error) {
    console.log(error.message)
  }
})
watch(async () => {
  await store.allToDoAction()
})
</script>

<template>
  <main>
    <section class="home-page">
      <div class="container">
        <!-- <div class="block-btn">
        <button @click="addTodo = true">add todo</button>
        <button>delete todo</button>
        <button>create todo</button>
        <button>edit todo</button>
      </div> -->
        <div>
          <UModal v-if="createTodo" :toggleModal="createTodo" :hideDialog="hideCreateTodo">
            <formCreateTodo :hideDialog="hideCreateTodo"
          /></UModal>
          <div class="sidebar">
            <TodoList :toDos="store.toDo">
              <template v-slot:toDo="slotProps"
                ><TodoItem
                  :id="slotProps.toDo.id"
                  :name="slotProps.toDo.name"
                  :desc="slotProps.toDo.desc"
                  :passId="clickId"
                  :deleteId="deleteId"
                />
              </template>
            </TodoList>

            <div class="sidebar__info">
              <ReviewToDo v-if="ReviewToDoInfo" :Review="ReviewToDoInfo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.home-page {
  padding-top: 20px;
}
.wrapper {
  &:hover,
  &:focus {
    color: red;
    cursor: pointer;
  }
}

.sidebar {
  display: flex;
  column-gap: 25px;

  &__info {
    width: 100%;
  }
}
</style>
