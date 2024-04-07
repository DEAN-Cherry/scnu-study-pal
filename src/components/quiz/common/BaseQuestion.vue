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
  console.log(props.questionList)
  console.log(props.questionId)
})
</script>

<template>
  <div flex>
    <div flex="col">
      <div mx-2>
        <QuestionTitle :question-title="questionObject.question" />
      </div>
      <div>
        <template v-if="questionObject.type === 'singleChoice'">
          <SingleChoiceQuestion :data-list="questionObject.dataList" />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
