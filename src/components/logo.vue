<!-- eslint-disable vue/multi-word-component-names -->
<script setup></script>
<template lang="">
  <div class="logo">
    <a href="/" class="logo__link">To-Do List</a>
  </div>
</template>

<style lang="scss">
.logo {
  &__link {
    color: #36cf40;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-decoration: underline;

    &:hover,
    &:focus {
      color: #2c800d;
    }
  }
}
</style>
