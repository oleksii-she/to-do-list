<script setup>
defineProps({
  toDos: {
    type: Array,
    required: true
  }
})
</script>
<template>
  <ul class="item-list">
    <template v-for="toDo in toDos" :key="toDo.id">
      <slot v-bind:toDo="toDo" name="toDo"></slot>
    </template>
  </ul>
</template>

<style scoped lang="scss">
.item-list {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  overflow: scroll;
  height: calc(100vh - 140px);
}
</style>
