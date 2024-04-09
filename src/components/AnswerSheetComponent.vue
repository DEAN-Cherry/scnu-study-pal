<script setup lang="ts">
import { getExam } from '@/composables/quiz'

const quizStore = useQuizStore()
const exam = getExam(quizStore.currentQuestion.quizType)

const drawer = ref(false)
const radio1 = ref('Option 1')
const isCurrentQuestion = computed(() => (topicIndex: number, questionIndex: number) => {
  return quizStore.currentQuestion.topicId === topicIndex && quizStore.currentQuestion.questionId === questionIndex
})

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure you want to close this?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

function cancelClick() {
  drawer.value = false
}

function confirmClick() {
  ElMessageBox.confirm(`Are you confirm to chose ${ radio1.value } ?`)
    .then(() => {
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
        <div>
          <ElDivider>
            <h3> 题目1</h3>
          </ElDivider>
          <div p-2 space-x-4 space-y-4>
            <el-avatar style="background-color: #21ba45">
              user
            </el-avatar>
            <el-avatar class="avatar-wrong">
              user
            </el-avatar>
            <el-avatar cursor="pointer">
              user
            </el-avatar>
            <el-avatar size="large">
              user
            </el-avatar>
            <el-avatar> user</el-avatar>
            <el-avatar> user</el-avatar>
            <el-avatar> user</el-avatar>
            <el-avatar> user</el-avatar>
          </div>
        </div>
      </div>
      <div>
        <el-radio v-model="radio1" value="Option 1" size="large">
          Option 1
        </el-radio>
        <el-radio v-model="radio1" value="Option 2" size="large">
          Option 2
        </el-radio>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">
          取消
        </el-button>
        <el-button type="primary" @click="confirmClick">
          确认
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
</style>
