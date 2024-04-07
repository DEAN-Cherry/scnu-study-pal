<script setup lang="ts">
import { Pane } from 'splitpanes'
// import 'splitpanes/dist/splitpanes.css'
</script>

<template>
  <Pane bg="[#fdfdfe] dark:[#2b2b2b]" rounded="4">
    <slot/>
  </Pane>
</template>

<style scoped lang="scss">

</style>
