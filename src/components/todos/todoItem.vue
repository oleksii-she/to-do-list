<script setup>
import { ref } from 'vue'
const props = defineProps({
  id: String,
  name: String,
  desc: String,
  done: Boolean,
  passId: {
    type: Function,
    required: false
  },
  changeUpdateDone: Function,
  deleteId: Function
})
const checkBox = ref(props.done)
const onChange = (e) => {
  checkBox.value = e.target.checked

  props.changeUpdateDone(props.id, checkBox.value)
}
</script>
<template>
  <li class="item">
    <div class="wrapper" @click="passId(id)">
      <h2 class="item__title">{{ name }}</h2>
      <p class="item__text">{{ desc }}</p>
    </div>
    <div class="item__check-btn-box">
      <div v-if="!done" class="form-check">
        <input
          @change="onChange"
          v-model="checkBox"
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckIndeterminate"
        />
        <label class="form-check-label" for="flexCheckIndeterminate"> Done </label>
      </div>
      <button v-else type="button" class="btn btn-outline-danger" @click="deleteId(id)">
        delete
      </button>
    </div>
  </li>
</template>

<style scoped lang="scss">
.item {
  border-bottom: 1px solid $activeColor;
  padding: 15px;

  &__text {
    /* width: 250px; */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 3.6em;
    line-height: 1.8em;
  }

  &__check-btn-box {
    float: right;
  }
}
.wrapper {
  &:hover,
  &:focus {
    color: red;
    cursor: pointer;
  }
}
.form-check-input {
  width: 2em;
  height: 2em;
}
.form-check {
  display: flex;
  column-gap: 15px;
  align-items: center;
}
</style>
