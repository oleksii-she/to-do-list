<script setup>
import { ref, watchEffect, reactive } from 'vue'

// import formCreateTodo from '../components/formCreateTodo.vue'
import TodoList from '../components/todos/todoList.vue'
import { useToDoStore } from '../stores/todosStore'
import TodoItem from '../components/todos/todoItem.vue'
import CreateEditTodo from '../components/createEditTodo.vue'
// import ReviewToDo from '../components/reviewToDo.vue'

const store = useToDoStore()

const createTodoState = reactive({
  name: '',
  desc: ''
})

const ReviewToDoInfo = ref(null)

const updateToDoState = reactive({
  name: '',
  desc: ''
})

// const createTodo = ref(false)
const idTodo = ref(null)

const clickId = (id) => {
  console.log(id)
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

const updateToDo = async (updatingData) => {
  if (!updatingData) {
    return
  }

  const newToDo = {
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
          <!-- <UModal v-if="createTodo" :toggleModal="createTodo" :hideDialog="hideCreateTodo">
            <formCreateTodo :hideDialog="hideCreateTodo"
          /></UModal> -->
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
              <!-- <ReviewToDo v-if="ReviewToDoInfo" :Review="ReviewToDoInfo" /> -->
              <CreateEditTodo
                v-if="!ReviewToDoInfo"
                :name="createTodoState.name"
                @update:name="createTodoState.name = $event"
                :desc="createTodoState.desc"
                @update:desc="createTodoState.desc = $event"
                buttonSignature="Create"
                :buttonEvent="createToDo"
              />
              <CreateEditTodo
                v-else
                :initialStateToUpdate="ReviewToDoInfo"
                buttonSignature="Update"
                :buttonEvent="updateToDo"
                :modeToggle="true"
              />
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
