<script setup lang="ts">
const quizStore = useQuizStore()
const { programmingScore } = toRefs(quizStore)
</script>

<template>
  <div flex items-center justify-center space-x-4>
    <p>编程题分数</p>
    <el-input
      v-model="programmingScore" placeholder="请等待老师判分"
      :formatter="(value:string) => value.replace(/\D+/g, '')"
      maxlength="2"
      type="number"
      show-word-limit
      style="width: 160px"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
