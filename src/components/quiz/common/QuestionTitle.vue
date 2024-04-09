<script setup lang="ts">
defineProps({ questionTitle: { type: String, default: '' } })
</script>

<template>
  <div m="x-3 t-2">
    <p text="[#020202] dark:[#f2f2f2] 15px" whitespace="pre-wrap">
      {{ questionTitle }}
    </p>
  </div>
</template>

<style scoped lang="scss">

</style>
