<script setup lang="ts">
import { QUIZ_TYPE } from '@/typings/enum'

const radio = ref<string>('A')

function onChange() {
  console.log(radio.value)
}

const props = defineProps({
  dataList: {
    type: Object, default() {
      const questionList = getQuestionList(QUIZ_TYPE.BASE, 0)
      return questionList[0].dataList
    },
  },
  questionId: { type: Number, default: 0 },
})

onMounted(() => {
  console.log(props.dataList)
  console.log(props.questionId)
})
</script>

<template>
  <div>
    <ElRadioGroup
      v-model="radio"
      @click="onChange()"
      style="display: flex;"
    >
      <div>
        <template
          v-for="(item, index) in dataList" :key="index"
        >
          <div m="t-2 l-4">
            <ElRadio :value="item.alpha" m="l-10 r-2" size="large">
              <p text-pretty>
                {{ item.alpha }}.&nbsp;{{ item.text }}
              </p>
            </ElRadio>
          </div>
        </template>
      </div>
    </ElRadioGroup>
  </div>

  <!--  <div flex>-->
  <!--    <div flex="col">-->
  <!--      <div mx-2>-->
  <!--        <QuestionTitle :question-title="props.questionList[questionId].question" />-->
  <!--      </div>-->
  <!--      <div>-->
  <!--        <ElRadioGroup-->
  <!--          v-model="radio"-->
  <!--          @click="onChange()"-->
  <!--          style="display: flex;"-->
  <!--        >-->
  <!--          <div>-->
  <!--            <template-->
  <!--              v-for="(item, index) in questionList[questionId].dataList" :key="index"-->
  <!--            >-->
  <!--              <div mt-2>-->
  <!--                <ElRadio :value="item.alpha" m="l-10 r-2" size="large">-->
  <!--                  <p text-pretty>-->
  <!--                    {{ item.alpha }}.&nbsp;{{ item.text }}-->
  <!--                  </p>-->
  <!--                </ElRadio>-->
  <!--              </div>-->
  <!--            </template>-->
  <!--          </div>-->
  <!--        </ElRadioGroup>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<style scoped lang="scss">

</style>
