<script setup lang="ts">

import { QUIZ_TYPE } from '@/typings/enum'

const props = defineProps({
  dataList: {
    type: Object, default() {
      const questionList = getQuestionList(QUIZ_TYPE.BASE, 0)
      return questionList[0].dataList
    },
  },
  questionId: { type: Number, default: 0 },
})
const quizStore = useQuizStore()
const { checkList, answer } = toRefs(quizStore)

function handleChange() {
  answer.value = checkList.value
}


onMounted(() => {
  console.log('Multiple question', props.dataList)
})
</script>

<template>
  <div flex flex-row justify-center>
    <el-checkbox-group @change="handleChange" v-model="checkList">
      <template v-for="(item, index) in dataList" :key="index">
        <el-checkbox :label="`${item.alpha}.\t${item.text}`" :value="item.alpha" />
      </template>
    </el-checkbox-group>
  </div>
</template>

<style scoped lang="scss">

</style>
