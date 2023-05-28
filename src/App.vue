<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="layout-wrapper">
    <div class="layout-container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.layout-container {
  max-width: 100%;
  width: 1060px;
}
</style>
