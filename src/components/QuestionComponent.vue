<script setup lang="ts">

// pinia store

import { QUIZ_TYPE } from '@/typings/enum'
import { ElMessageBox } from 'element-plus'

const quizStore = useQuizStore()
const timeStore = useTimerStore()

const { currentQuestion, currentPage } = toRefs(quizStore)
const { duration, timerColor } = toRefs(timeStore)
const page = ref()
const resources = computed(() => {
  if (quizStore.currentEvaluation) {
    return getTopic(currentQuestion.value.quizType, currentQuestion.value.topicId, quizStore.currentEvaluation)
  }
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
  const answer = quizStore.submitAnswer()
  const statement = getFeedbackByIndex(quizStore.currentQuestion.quizType, quizStore.currentQuestion.topicId, quizStore.currentQuestion.questionId)
  const alertText = getStatementTextByType(statement, answer, quizStore.getStandardAnswer())
  if (alertText) {
    ElMessageBox.alert(alertText, { confirmButtonText: '确认', title: '提示' })
      .then(() => {
        if (quizStore.isLastQuestion() === true) {
          const summary = getSummaryByIndex(quizStore.currentQuestion.quizType, quizStore.currentQuestion.topicId)
          ElMessageBox.alert(`${ summary }`, { confirmButtonText: '确认', title: '总结' })
            .then(() => {
              quizStore.autoNextTopic()
            })
        } else if (quizStore.isLastQuestion() === -1) {
          const summary = getSummaryByIndex(quizStore.currentQuestion.quizType, quizStore.currentQuestion.topicId)
          ElMessageBox.alert(`${ summary }`, { confirmButtonText: '确认', title: '总结' })
            .then(() => {
              ElMessageBox.confirm('是否交卷?', { confirmButtonText: '确认', cancelButtonText: '取消' })
            })
        } else
          quizStore.autoNextTopic()
      })
      .catch(() => {
        // catch error
      })
  } else {

    if (quizStore.isLastQuestion() === true) {
      const summary = getSummaryByIndex(quizStore.currentQuestion.quizType, quizStore.currentQuestion.topicId)
      ElMessageBox.alert(`${ summary }`, { confirmButtonText: '确认', title: '总结' })
        .then(() => {
          quizStore.autoNextTopic()
        })
    } else if (quizStore.isLastQuestion() === -1) {
      const summary = getSummaryByIndex(quizStore.currentQuestion.quizType, quizStore.currentQuestion.topicId)
      ElMessageBox.alert(`${ summary }`, { confirmButtonText: '确认', title: '总结' })
        .then(() => {
          ElMessageBox.confirm('是否交卷?', { confirmButtonText: '确认', cancelButtonText: '取消' })
        })
    } else
      quizStore.autoNextTopic()
  }

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
        w="80%" mt-2
        flex flex-row items-center
        justify-between
      >
        <div>{{ topic }}</div>
        <div>
          <AnswerSheetComponent />
        </div>
        <div flex items-center space-x-2>
          <!--          <ElIcon size="large">-->
          <IconMdiProgressClock h="2em" w="2em" :style="{color: timerColor}" />
          <!--              <ElIconAlarmClock :style="{color: timerColor}" />-->
          <!--          </ElIcon>-->
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
