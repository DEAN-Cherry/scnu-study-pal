<script setup lang="ts">
import AppMain from '@/components/app/AppMain.vue'
</script>

<template>
  <AppHeader />
  <div class="main-container flex">
    <AppSider />
    <AppMain />
  </div>
</template>

<style scoped lang="scss">
.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 4px);
}
</style>
