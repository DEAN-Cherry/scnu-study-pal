<script setup lang="ts">

const props = defineProps({
  reverse: { type: Boolean, default: false },
  message: { type: String, default: '' },
})
</script>

<template>
  <div v-if="message">
    <div flex justify-end v-if="reverse">
      <el-card
        w="2/3"
        shadow="hover"
        flex items-center
        whitespace-pre-wrap text-3
      >
        {{ props.message }}
      </el-card>
    </div>
    <div v-else>
      <el-card

        w="2/3" min-h="10"
        shadow="hover"
        flex items-center whitespace-pre-wrap
        text-3
      >
        {{ props.message }}
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
