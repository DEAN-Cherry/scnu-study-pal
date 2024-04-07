<script setup lang="ts">

// pinia store
const quizStore = useQuizStore()
const timeStore = useTimerStore()

const { currentQuestion, currentPage } = toRefs(quizStore)
const { duration, timerColor } = toRefs(timeStore)

const resources = computed(() => {
  return getTopic(currentQuestion.value.quizType, currentQuestion.value.topicId)
})


const topic = ref<string>('基础任务')

const handleCurrentChange = (val: number) => {
  currentQuestion.value.questionId = val - 1
  console.log(`current page: ${ val }`)
}
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
          <ElButton type="primary" plain>
            提交
          </ElButton>
        </div>
        <div>
          <el-pagination
            v-model="currentPage"
            flex="justify-center"
            small background mt-4
            layout="prev, pager, next"
            :total="resources.questionList.length"
            :page-size="1"
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
