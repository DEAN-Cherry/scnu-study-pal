<script setup lang="ts">

import { QUIZ_TYPE } from '@/typings/enum'

const timeStore = useTimerStore()
const quizStore = useQuizStore()
const totalScore = computed(() => {
  return quizStore.score + timeStore.getTimeScore()
})

const evaluation = computed(() => {
  return getEvaluationByScore(totalScore.value) ?? { level: 'D', comment: 'test' }
})

function onStartHandler() {
  timeStore.resetTimer()
  timeStore.startTimer(45 * 60 * 1000)
  console.log('evaluation', evaluation.value.level)
  quizStore.currentEvaluation = evaluation.value.level
  quizStore.initResult(QUIZ_TYPE.ADVANCED)
  quizStore.initCurrentQuestion(QUIZ_TYPE.ADVANCED)
}

onMounted(() => {
  timeStore.stopTimer()
})


</script>

<template>
  <div flex items-center justify-center class="h-full">
    <div flex grow justify-center>
      <ElCard
        ml-10 mr-10 max-w-3xl
        grow
        shadow="hover"
      >
        <template #header>
          <div class="card-header" flex flex-row justify-between>
            <span
              from-blue-600 to-green-500 bg-gradient-to-r
              bg-clip-text
              text-3xl text-transparent font-bold
            >测试结果</span>
          </div>
        </template>
        <div flex justify-center>
          <div class="check-text flex flex-col justify-center">
            <div text-2xl>
              <p>得分: {{ totalScore }} 分</p>
              <p>总分: 100 分</p>
            </div>
            <div flex items-center text-2xl space-x-2>
              <IconMdiProgressClock h="2em" w="2em" />
              <p>用时：{{ timeStore.duration }}</p>
            </div>

            <span class="text-blue">
              <p text-3xl>
                您的思维水平是: {{ evaluation.level }}
              </p>
            </span>
            <span class="text-[#c04851]">
              {{ evaluation.comment }}
            </span>
          </div>
        </div>
        <template #footer>
          <div flex justify-center>
            <RouterLink to="/app/exam" v-slot="{ navigate }">
              <ElButton type="primary" size="large" @click="()=>{navigate();onStartHandler()}" class="beautiful-text">
                继续测试
              </ElButton>
            </RouterLink>
          </div>
        </template>
      </ElCard>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
