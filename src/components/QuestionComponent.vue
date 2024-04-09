<script setup lang="ts">

// pinia store

import { QUIZ_TYPE } from '@/typings/enum'

const quizStore = useQuizStore()
const timeStore = useTimerStore()

const { currentQuestion, currentPage } = toRefs(quizStore)
const { duration, timerColor } = toRefs(timeStore)
const page = ref()
const resources = computed(() => {
  return getTopic(currentQuestion.value.quizType, currentQuestion.value.topicId)
})


const topic = computed(() => {
  switch (currentQuestion.value.quizType) {
    case QUIZ_TYPE.BASE:
      return '基础任务'
    case QUIZ_TYPE.ADVANCED:
      return '高级任务'
    default:
      return '基础任务'
  }
})

const handleCurrentChange = (val: number) => {
  currentQuestion.value.questionId = val - 1
  quizStore.renderUserAnswer()
}

function handleSubmit() {
  quizStore.submitAnswer()
  quizStore.autoNextTopic()
}

onMounted(() => {
  quizStore.initResult(quizStore.currentQuestion.quizType)

})
</script>

<template>
  <div h-full flex flex-col items-center>
    <div
      h="full" w-full flex
      flex-col
      items-center
    >
      <!--     Head Part      -->
      <div
        w="80%" mt-4
        flex flex-row items-center
        justify-between
      >
        <div>{{ topic }}</div>
        <div>
          <AnswerSheetComponent />
        </div>
        <div space-x-2>
          <ElIcon>
            <ElIconAlarmClock :style="{color: timerColor}" />
          </ElIcon>
          <p inline>
            {{ duration }}
          </p>
        </div>
      </div>

      <div h-full>
        <p
          m="x-3 b-2" class="zheng-regular"
          text="18px"
          whitespace="pre-wrap"
        >
          {{ resources.title }}
        </p>
        <BaseQuestion
          :question-list="resources.questionList"
          :question-id="currentQuestion.questionId"
        />
      </div>
      <div grow p="b-5">
        <div flex justify-center m="b-4">
          <ElButton type="primary" plain @click="handleSubmit">
            提交
          </ElButton>
        </div>
        <div>
          <el-pagination
            v-model="page"
            flex="justify-center"
            small background mt-4
            layout="prev, pager, next"
            :total="resources.questionList.length"
            :page-size="1"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <!--    -->
  </div>
</template>

<style scoped lang="scss">
.zheng-regular {
  font-family: "Ma Shan Zheng", cursive;
  font-weight: 600;
  font-style: normal;
}

</style>
