<script setup>
import { reactive, watchEffect } from 'vue'
import { useToDoStore } from '../stores/todosStore'

const store = useToDoStore()
// editToDoAction
const props = defineProps({
  Review: {
    type: Object
  }
})

const newValue = reactive({
  name: '',
  desc: ''
})

const editTodo = async () => {
  await store.editToDoAction(props.Review.id, newValue)
}

watchEffect(() => {
  newValue.name = props.Review.name
  newValue.desc = props.Review.desc
})
</script>

<template lang="">
  <div class="info">
    <input type="text" v-model="newValue.name" class="info__text" />
    <textarea type="textarea" v-model="newValue.desc" class="info__description" />
    <button type="button" @click="editTodo">edit todo</button>
  </div>
</template>

<style lang="scss" scoped>
.info {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  height: calc(100vh - 100px);
  &__text {
    border: none;
    border-bottom: 1px solid $btnColor;
  }

  &__description {
    border: none;
    height: 60%;
    resize: none;
    border-bottom: 1px solid $btnColor;
  }
}
</style>
