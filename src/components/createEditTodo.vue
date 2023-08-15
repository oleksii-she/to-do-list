<script setup>
import { reactive, watchEffect, ref } from 'vue'

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

const disabledUpdateBtn = ref(true)
const disabledCreateBtn = ref(true)

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
  if (props.initialStateToUpdate) {
    const isNameSame = updateValue.name === props.initialStateToUpdate.name
    const isDoneSame = updateValue.done === props.initialStateToUpdate.done
    const isDescSame = updateValue.desc === props.initialStateToUpdate.desc

    disabledUpdateBtn.value = isNameSame && isDoneSame && isDescSame
  }
})

watchEffect(() => {
  if (props.initialStateToUpdate) {
    return
  }
  const name = props.name
  const desc = props.desc
  if (name === '' || desc === '') {
    disabledCreateBtn.value = true
  } else {
    disabledCreateBtn.value = false
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
    <div class="btn-box">
      <div v-if="modeToggle" class="form-check">
        <input
          @change="onChange"
          class="form-check-input"
          type="checkbox"
          v-model="updateValue.done"
          id="flexCheckIndeterminate"
        />
        <label class="form-check-label" for="flexCheckIndeterminate">
          change the task status
        </label>
      </div>

      <button
        v-if="props.initialStateToUpdate"
        class="btn btn-primary"
        :disabled="disabledUpdateBtn"
        type="button"
        @click="buttonEvent(updateValue)"
      >
        {{ buttonSignature }}
      </button>
      <button
        v-if="!props.initialStateToUpdate"
        class="btn btn-primary"
        :disabled="disabledCreateBtn"
        type="button"
        @click="buttonEvent(updateValue)"
      >
        {{ buttonSignature }}
      </button>

      <!-- disabledCreateBtn -->
    </div>
    <!-- change the task status -->
  </div>
</template>

<style lang="scss" scoped>
.info {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  height: calc(100vh - 160px);
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
.btn-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 15px;
}

.form-check-input {
  cursor: pointer;
}
</style>
