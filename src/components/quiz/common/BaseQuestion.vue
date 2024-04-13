<script setup lang="ts">
import { QUIZ_TYPE } from '@/typings/enum'



const props = defineProps({
  questionList: {
    type: Object, default() {
      return getQuestionList(QUIZ_TYPE.BASE, 0)
    },
  },
  questionId: { type: Number, default: 0 },
})

const questionObject = computed(() => {
  return props.questionList[props.questionId]
})

onMounted(() => {
  console.log('Base Question', props.questionList)
})
</script>

<template>
  <div w-full flex>
    <div flex="col" w-full>
      <div w-full>
        <QuestionTitle mx-6 :question-title="questionObject.question" />
      </div>
      <div>
        <template v-if="questionObject.type === 'singleChoice'">
          <SingleChoiceQuestion :data-list="questionObject.dataList" />
        </template>
        <template v-else-if="questionObject.type === 'multipleChoice'">
          <MultipleChoiceQuestion :data-list="questionObject.dataList" />
        </template>
        <template v-else-if="questionObject.type === 'matching'">
          <MatchingQuestion :data-list="questionObject.dataList" />
        </template>
        <template v-else-if="questionObject.type === 'programming'">
          <ProgrammingQuestion />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
