<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
// import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
const props = defineProps(
  {
    color: {
      type: String,
      default: '#36cf40'
    },
    size: {
      type: String,
      default: '50px'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  { raw: true, shallow: true }
)
</script>

<template>
  <div class="loader">
    <pulse-loader :loading="props.loading" :color="props.color" :size="props.size"></pulse-loader>
  </div>
</template>

<style scoped lang="scss">
.loader {
  position: fixed;
  z-index: 999;
  left: 50%;
  bottom: 20%;
  transform: translate(-50%, -50%);
}
</style>
