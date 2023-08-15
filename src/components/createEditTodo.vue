<script setup>
import { reactive, watchEffect } from 'vue'

const props = defineProps({
  name: String,
  desc: String,
  done: Boolean,
  buttonSignature: String,
  buttonEvent: Function,
  modeToggle: {
    type: Boolean,
    default: false
  },
  initialStateToUpdate: Object
})

const updateValue = reactive({
  id: '',
  done: '',
  name: '',
  desc: ''
})

const onChange = (e) => {
  updateValue.done = e.target.checked
}

watchEffect(() => {
  if (props.initialStateToUpdate) {
    updateValue.id = props.initialStateToUpdate.id
    updateValue.done = props.initialStateToUpdate.done
    updateValue.name = props.initialStateToUpdate.name
    updateValue.desc = props.initialStateToUpdate.desc
  }
})

watchEffect(() => {
  console.log(updateValue.done)
  // if (updateValue.done !== props.initialStateToUpdate.done) {
  //    updateValue.done =
  // }
})
</script>

<template lang="">
  <div class="info">
    <input
      v-if="!modeToggle"
      type="text"
      class="info__text"
      :value="name"
      @input="$emit('update:name', $event.target.value)"
    />
    <textarea
      v-if="!modeToggle"
      type="textarea"
      class="info__description"
      :value="desc"
      @input="$emit('update:desc', $event.target.value)"
    />

    <input v-if="modeToggle" class="info__text" type="text" v-model="updateValue.name" />
    <textarea
      v-if="modeToggle"
      type="textarea"
      class="info__description"
      v-model="updateValue.desc"
    />
    <div v-if="modeToggle" class="form-check">
      <input
        @change="onChange"
        class="form-check-input"
        type="checkbox"
        v-model="updateValue.done"
        id="flexCheckIndeterminate"
      />
      <label class="form-check-label" for="flexCheckIndeterminate"> change the task status </label>
    </div>

    <button class="btn btn-primary" type="button" @click="buttonEvent(updateValue)">
      {{ buttonSignature }}
    </button>

    <!-- change the task status -->
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
