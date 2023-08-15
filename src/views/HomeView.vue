<script setup>
import { ref, watchEffect, reactive } from 'vue'

import TodoList from '../components/todos/todoList.vue'
import { useToDoStore } from '../stores/todosStore'
import TodoItem from '../components/todos/todoItem.vue'
import CreateEditTodo from '../components/createEditTodo.vue'

const store = useToDoStore()

const createTodoState = reactive({
  name: '',
  desc: ''
})

const ReviewToDoInfo = ref(null)

const idTodo = ref(null)

const clickId = (id) => {
  idTodo.value = id
}

const deleteId = async (id) => {
  if (!id) return
  await store.deleteToDoAction(id)
}

const createToDo = async () => {
  if (createTodoState.name === '' || createTodoState.desc === '') {
    return console.log('All fields must be filled')
  }
  await store.createToDoAction(createTodoState)
}

const changeUpdateDone = async (id, done) => {
  await store.editToDoAction(id, { done: done })
}

const updateToDo = async (updatingData) => {
  const newToDo = {
    done: updatingData.done,
    name: updatingData.name,
    desc: updatingData.desc
  }

  await store.editToDoAction(updatingData.id, newToDo)
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
watchEffect(async () => {
  idTodo.value

  await store.allToDoAction()
})

watchEffect(() => {
  // перемикач між створенням та оновленням
  if (ReviewToDoInfo.value) {
    store.createToggleAction(false)
  }
})
</script>

<template>
  <main>
    <section class="home-page">
      <div class="container">
        <div>
          <div class="sidebar">
            <div class="sidebar__todo">
              <TodoList :toDos="store.toDo">
                <template v-slot:toDo="slotProps"
                  ><TodoItem
                    :id="slotProps.toDo.id"
                    :name="slotProps.toDo.name"
                    :desc="slotProps.toDo.desc"
                    :done="slotProps.toDo.done"
                    :passId="clickId"
                    :deleteId="deleteId"
                    :changeUpdateDone="changeUpdateDone"
                  />
                </template>
              </TodoList>
            </div>

            <div class="sidebar__info">
              <div v-if="store.createToggle">
                <h2>Create ToDo</h2>
                <CreateEditTodo
                  :name="createTodoState.name"
                  @update:name="createTodoState.name = $event"
                  :desc="createTodoState.desc"
                  @update:desc="createTodoState.desc = $event"
                  buttonSignature="Create ToDo"
                  :buttonEvent="createToDo"
                />
              </div>

              <div v-else>
                <h2>Update ToDo</h2>
                <CreateEditTodo
                  :initialStateToUpdate="ReviewToDoInfo"
                  buttonSignature="Update ToDo"
                  :buttonEvent="updateToDo"
                  :modeToggle="true"
                />
              </div>
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
  &__todo {
    width: 400px;
  }
  &__info {
    width: 100%;
  }
}
</style>
