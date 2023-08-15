<script setup>
import { reactive, watchEffect, ref, watch, defineEmits } from 'vue'

const props = defineProps({
  name: String,
  desc: String,
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
  name: '',
  desc: ''
})
watchEffect(() => {
  if (props.initialStateToUpdate) {
    updateValue.id = props.initialStateToUpdate.id
    updateValue.name = props.initialStateToUpdate.name
    updateValue.desc = props.initialStateToUpdate.desc
  }
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
    <button type="button" @click="buttonEvent(updateValue)">{{ buttonSignature }}</button>
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
