<script setup lang="ts">

import { QUIZ_TYPE } from '@/typings/enum'
import { parseIndex } from '@/utils/base'
import appleImage from '@/assets/img/base_exam/apple.png'
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
const { matching, answer } = toRefs(quizStore)
// const items = ref(['Item 1',
// 'Item 2',
// 'Item 3'])
// const draggedIndex = ref()
//
// function dragStart(index:number) {
//   draggedIndex.value = index
// }
//
// function drop() {
//   // 这里可以根据需求进行数据更新或其他操作
//   alert(`放置的项目: ${items.value[draggedIndex.value]}`)
//   // 例如，可以将拖拽的元素从列表中移除
//   items.value.splice(draggedIndex.value, 1)
// }
const resolveImagePath = (path:string) => {
  // 注意：这里假设图片实际上放在了public目录下，
  // 如果图片放在了src/assets目录，需要确保Vite配置正确处理了这种情况
  return new URL(path.replace('@', '/src'), import.meta.url).href
}

onMounted(() => {
  console.log('Matching question', props.dataList)
  quizStore.renderUserAnswer()
  answer.value = matching.value
})
watch(() => matching, () => {
  answer.value = matching.value
}, { deep: true })
</script>

<template>
  <div h-full w-full flex>
    <div
      mx-10
      w-full flex flex-row
      items-center
      space-x-2
    >
      <div
        flex flex-col items-center
        justify-between
        w="50%"
      >
        <template v-for="(item, index1) in dataList" :key="index1">
          <div
            w-full flex flex-row
            items-center
            space-x-4
          >
            <p w="1/2">
              {{ item.text }}
            </p>
            <div>
              <el-input
                v-model="matching[parseIndex(index1)]"
                :parser="(value:string) => value.toUpperCase()"
                :formatter="(value:string) => value.replace(/[^A-Z]/g, '')"
                style="width: 130px"
                maxlength="1"
                placeholder="请输入答案"
                show-word-limit
                type="text"
              />
            </div>
          </div>
        </template>
      </div>

      <div flex flex-col>
        <template v-for="(item, index) in dataList" :key="index">
          <div
            v-if="item.picture"
            flex flex-row
            items-center
            space-x-4
          >
            <p>{{ item.alpha }}.</p>
            <ElAvatar :src="resolveImagePath(item.picture)" />
          </div>
          <p v-else>
            {{ item.alpha }}.&nbsp;{{ item.selectText }}
          </p>
        </template>
      </div>
    </div>
  </div>

  <!--  <template v-for="(item, index) in props.dataList" :key="index">-->
  <!--    <div h-full flex px-12>-->
  <!--      <div-->
  <!--        w-full flex flex-row-->
  <!--        items-center-->
  <!--        space-x-10-->
  <!--      >-->
  <!--        <div flex flex-row items-center justify-between>-->
  <!--          <div>-->
  <!--            {{ item.text }}-->
  <!--          </div>-->
  <!--          <div>-->
  <!--            <el-input-->
  <!--              v-model="answer[index as number]"-->
  <!--              :parser="(value:string) => value.toUpperCase()"-->
  <!--              :formatter="(value:string) => value.replace(/[^A-Z]/g, '')"-->
  <!--              style="width: 120px"-->
  <!--              maxlength="1"-->
  <!--              placeholder="请输入答案"-->
  <!--              show-word-limit-->
  <!--              type="text"-->
  <!--            />-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <div flex justify-start>-->
  <!--          <p>-->
  <!--            {{ item.alpha }}.&nbsp;{{ item.selectText }}-->
  <!--          </p>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </template>-->
  <!--  <div>-->
  <!--    <div-->
  <!--      v-for="(item, index) in items"-->
  <!--      :key="index"-->
  <!--      :draggable="true"-->
  <!--      @dragstart="dragStart(index)"-->
  <!--      class="drag-item"-->
  <!--    >-->
  <!--      {{ item }}-->
  <!--    </div>-->
  <!--    <div-->
  <!--      class="drop-area"-->
  <!--      @dragover.prevent-->
  <!--      @drop="drop"-->
  <!--    >-->
  <!--      放置区域-->
  <!--    </div>-->
  <!--  </div>-->
</template>


<style scoped lang="scss">
.drag-item {
  margin: 10px;
  padding: 10px;
  background-color: lightgray;
  cursor: move;
}

.drop-area {
  margin: 10px;
  padding: 30px;
  background-color: #f0f0f0;
  text-align: center;
}
</style>
