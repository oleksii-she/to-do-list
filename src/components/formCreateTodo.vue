<script setup>
// import axios from 'axios'
import { reactive } from 'vue'
import { useToDoStore } from '../stores/todosStore'

const store = useToDoStore()

const props = defineProps({
  hideDialog: {
    type: Function,
    required: false
  },
  padding: Number
})

const initialState = reactive({
  name: '',
  desc: ''
})

const submit = async () => {
  try {
    if ((initialState.name === '', initialState.desc === '')) {
      return console.log('All fields must be filled')
    }
    await store.createToDoAction(initialState)

    props.hideDialog()
  } catch (error) {
    console.log(error.message)
  }
}
</script>

<template>
  <form class="form" @submit.prevent.stop="submit">
    <label for="">
      <p class="form__title">Name todo</p>
      <input type="text" name="name" class="form__input" v-model="initialState.name" />
    </label>
    <label for="">
      <p class="form__title">Description todo</p>
      <textarea type="textarea" v-model="initialState.desc" class="form__description" />
    </label>
    <button>create todo</button>
  </form>
</template>

<style lang="scss" scoped>
.form {
  padding: 25px;
  border-radius: 25px;
  background-color: $background;

  display: flex;
  flex-direction: column;
  row-gap: 20px;

  &__title {
    /* margin-bottom: 2px; */
  }

  &__input {
    border-radius: 8px;
    border: 1px solid;
    padding: 12px;
  }

  &__description {
    border-radius: 8px;
    border: 1px solid;
    padding: 12px;
    resize: none;
    height: calc(100vh - 70px);
  }
}
</style>
