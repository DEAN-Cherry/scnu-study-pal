<script setup lang="ts">
import { getExam } from '@/composables/quiz'

const quizStore = useQuizStore()
const exam = getExam(quizStore.currentQuestion.quizType)

const drawer = ref(false)
const isCurrentQuestion = computed(() => (topicIndex: number, questionIndex: number) => {
  return quizStore.currentQuestion.topicId === topicIndex && quizStore.currentQuestion.questionId === questionIndex
})


function cancelClick() {
  drawer.value = false
}

function confirmClick() {
  ElMessageBox.confirm('是否交卷?', { confirmButtonText: '确认', cancelButtonText: '取消' }).then(() => {
    drawer.value = false
  })
    .catch(() => {
      // catch error
    })
}

function handleQuestionClick(topicIndex: number, questionIndex: number) {
  quizStore.currentQuestion.questionId = questionIndex
  quizStore.currentQuestion.topicId = topicIndex
  drawer.value = false
}

function renderAvatar(topicIndex: number, questionIndex: number) {
  const answerSheet = quizStore.getCurrentAnswerSheet()
  try {
    const answer = answerSheet[topicIndex][questionIndex].answer
    if (answer) {
      switch (quizStore.isCorrect(topicIndex, questionIndex, answer)) {
        case true:
          return 'avatar-correct'
        case false:
          return 'avatar-wrong'
        case -1:
          return 'avatar-halt'
        default:
          return ''
      }
    } else {
      return ''
    }
  } catch (e) {
    return ''
  }
}

</script>

<template>
  <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
    答题卡
  </el-button>
  <el-drawer v-model="drawer" :direction="'rtl'" :size="'50%'">
    <template #header>
      <h4>答题卡</h4>
    </template>
    <template #default>
      <div flex flex-col>
        <template v-for="(topic, topicIndex) in exam.topic" :key="topicIndex">
          <el-divider>
            <h3> 题目 {{ topicIndex + 1 }}</h3>
          </el-divider>
          <div p-2 space-x-4 space-y-4>
            <template v-for="(question, questionIndex) in topic.questionList" :key="questionIndex">
              <el-avatar
                cursor-pointer
                size="large"
                :class="renderAvatar(topicIndex, questionIndex)"
                v-if="isCurrentQuestion(topicIndex, questionIndex)"
                @click="handleQuestionClick(topicIndex,questionIndex)"
              >
                {{ topicIndex + 1 }}.{{ questionIndex + 1 }}
              </el-avatar>
              <el-avatar
                v-else
                cursor-pointer
                :class="renderAvatar(topicIndex, questionIndex)"
                @click="handleQuestionClick(topicIndex,questionIndex)"
              >
                {{ topicIndex + 1 }}.{{ questionIndex + 1 }}
              </el-avatar>
            </template>
          </div>
        </template>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">
          取消
        </el-button>
        <el-button type="primary" @click="confirmClick">
          交卷
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.avatar-correct {
  background-color: #12a182;
}

.avatar-wrong {
  background-color: #f56c6c;
}

.avatar-halt {
  background-color: #f0ad4e;
}
</style>
