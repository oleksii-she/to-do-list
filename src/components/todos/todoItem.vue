<script setup>
defineProps({
  id: String,
  name: String,
  desc: String,
  passId: {
    type: Function,
    required: false
  }
})
</script>
<template>
  <li class="item">
    <div class="wrapper" @click="passId(id)">
      <h2 class="item__title">{{ name }}</h2>
      <p class="content__text">{{ desc }}</p>
      <button>delete</button>
    </div>
  </li>
</template>

<style scoped lang="scss">
.item {
  border-bottom: 1px solid $activeColor;
  &__title {
  }
}
.wrapper {
  &:hover,
  &:focus {
    color: red;
    cursor: pointer;
  }
}
</style>
