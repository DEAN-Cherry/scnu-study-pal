<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { Answers } from '@/typings/quiz'
import { ANSWER_TYPE } from '@/typings/enum'

defineProps<{ msg: string }>()

const count = ref(0)
const input = ref('element-plus')

const curDate = ref('')

const toast = () => {
  ElMessage.success('Hello')
}
const answers: Answers = { [0]: { type: ANSWER_TYPE.SINGLE_CHOICE, answer: 'A' } }
const testData = ref({
  name: 'apple',
  id: 1,
  nested: { text: 'Hello world', id : 0 },
  nested2: answers,
})
const value1 = ref(true)
const timeStore = useTimerStore()

function handleClick() {
  timeStore.resetTimer()
}

function testD(){
  const nested = testData.value.nested
  const td = testData.value
  const nested2 = testData.value.nested2
  nested2[1] = { type: ANSWER_TYPE.MATCHING, answer: 'Test' }
  nested.text = 'Hello world2'
  td.id++
  nested.id ++
}

</script>

<template>
  <h1 color="$ep-color-primary">
    {{ msg }}
    <br>
    {{ testData.name }}
    {{ testData.id }}
    {{ testData.nested.text }}
    {{ testData.nested.id }}
    {{ testData.nested2[0] }}
    nested2
    <br>
    {{ testData.nested2[1] }}
  </h1>

  <p>
    See
    <a href="https://element-plus.org" target="_blank">element-plus</a> for more
    information.
  </p>

  <!-- example components -->
  <div class="mb-4">
    <el-button size="large" @click="toast">
      El Message
    </el-button>
  </div>

  <div class="my-2 flex flex-wrap items-center justify-center text-center">
    <ElButton @click="handleClick">
      reset timer
    </ElButton>
    <ElButton type="primary" @click="testD">
      test nested ref
    </ElButton>
    <el-button @click="count++">
      count is: {{ count }}
    </el-button>
    <el-button type="primary" @click="count++">
      count is: {{ count }}
    </el-button>
    <el-button type="success" @click="count++">
      count is: {{ count }}
    </el-button>
    <el-button type="warning" @click="count++">
      count is: {{ count }}
    </el-button>
    <el-button type="danger" @click="count++">
      count is: {{ count }}
    </el-button>
    <el-button type="info" @click="count++">
      count is: {{ count }}
    </el-button>
  </div>

  <div>
    <el-tag type="success" class="m-1">
      Tag 1
    </el-tag>
    <el-tag type="warning" class="m-1">
      Tag 1
    </el-tag>
    <el-tag type="danger" class="m-1">
      Tag 1
    </el-tag>
    <el-tag type="info" class="m-1">
      Tag 1
    </el-tag>
  </div>

  <div>
    <el-switch v-model="value1" />
    <el-switch
      v-model="value1"
      class="m-2"
      style="--ep-switch-on-color: black; --ep-switch-off-color: gray;"
    />
  </div>

  <div class="my-2">
    <el-input class="m-2" v-model="input" style="width: 200px" />
    <el-date-picker
      class="m-2"
      v-model="curDate"
      type="date"
      placeholder="Pick a day"
    />
  </div>

  <p>For example, we can custom primary color to 'green'.</p>

  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test components.
  </p>
  <p>
    Edit
    <code>styles/element/var.scss</code> to test scss variables.
  </p>

  <p>
    Full Example:
    <a
      href="https://github.com/element-plus/element-plus-vite-starter"
      target="_blank"
    >element-plus-vite-starter</a>
    | On demand Example:
    <a
      href="https://github.com/element-plus/unplugin-element-plus"
      target="_blank"
    >unplugin-element-plus/examples/vite</a>
  </p>
</template>

<style>
.ep-button {
  margin: 4px;
}
.ep-button + .ep-button {
  margin-left: 0;
  margin: 4px;
}
</style>
