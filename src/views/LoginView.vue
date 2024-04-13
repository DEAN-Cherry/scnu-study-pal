<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { toggleDark } from '@/composables'

const isValid = ref(false)
const timeStore = useTimerStore()
const quizStore = useQuizStore()

interface RuleForm {
  id: number
  name: string
  school: string
  gender: string
}

const studentId = () => {
  return 1000 + Math.floor(Math.random() * 100 + 1)
}
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  id: studentId(),
  name: '',
  school: '',
  gender: 'male',
})

const rules = reactive<FormRules<RuleForm>>({
  id: [
    { required: true, message: '输入学号', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
{
 min: 2, max: 20, message: '长度需在 2 到 20 之间', trigger: 'blur',
},
  ],
  school: [
    { required: true, message: '请输入学校名称', trigger: 'change' }],
  gender: [
    {
      required: true,
      message: '请选择性别',
      trigger: 'change',
    },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      isValid.value = true
      console.log('submit!')
      console.log(ruleForm.gender)
    } else {
      console.log('error submit!', fields)
      isValid.value = false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  ruleForm.id = studentId()
}

function onStartHandler() {
  timeStore.resetTimer()
  timeStore.startTimer(45 * 60 * 1000)
  quizStore.resetQuiz()
}

</script>

<template>
  <ElConfigProvider namespace="ep">
    <div flex items-center justify-center class="h-full">
      <div v-if="isValid" flex grow justify-center>
        <ElCard
          ml-10 mr-10 max-w-3xl
          grow
          shadow="hover"
        >
          <template #header>
            <div class="card-header" flex flex-row justify-between>
              <span
                from-blue-600 to-purple-500 bg-gradient-to-r
                bg-clip-text
                text-3xl text-transparent font-bold
              >AI智慧学伴辅助培养计算思维平台</span>
              <button
                @click="toggleDark()"
                class="button-height cursor-pointer border-none bg-transparent"
              >
                <i inline-flex i="dark:ep-moon ep-sunny" />
              </button>
            </div>
          </template>
          <div flex justify-center>
            <div class="check-text flex flex-col justify-center">
              <span class="text-[#131124] dark:text-gray">
                &nbsp;&nbsp;&nbsp;&nbsp;
                该系统的设计是为了测验你的计算思维水平
                <br>
                共有四道大题，为了保证测验结果的准确，请您如实作答。
              </span>
              <span class="text-[#c04851]">
                &nbsp;&nbsp;&nbsp;&nbsp;
                每道小题完成之后可以和AI智慧学伴讨论交流，交流时间将计入总时长，做题的时间也会影响计算思维水平的结果。
              </span>
            </div>
          </div>
          <template #footer>
            <div flex justify-center>
              <RouterLink to="/app/exam" v-slot="{ navigate }">
                <ElButton type="primary" size="large" @click="()=>{navigate();onStartHandler()}" class="beautiful-text">
                  开始测验
                </ElButton>
              </RouterLink>
            </div>
          </template>
        </ElCard>
      </div>
      <div v-else flex grow justify-center>
        <ElCard
          ml-10 mr-10 max-w-3xl
          grow
          shadow="hover"
        >
          <template #header>
            <div class="card-header" flex flex-row justify-between>
              <span
                from-blue-600 to-purple-500 bg-gradient-to-r
                bg-clip-text
                text-3xl text-transparent font-bold
              >AI智慧学伴辅助培养计算思维平台</span>
              <button
                @click="toggleDark()"
                class="button-height cursor-pointer border-none bg-transparent"
              >
                <i inline-flex i="dark:ep-moon ep-sunny" />
              </button>
            </div>
          </template>
          <div flex justify-center>
            <div flex-col>
              <div text-center>
                <p
                  from-blue-300 to-blue-900 bg-gradient-to-r
                  bg-clip-text
                  text-2xl text-transparent font-bold
                >
                  登录
                </p>
                <div>
                  <el-divider>学生注册</el-divider>
                </div>
              </div>
              <div>
                <ElForm
                  ref="ruleFormRef"
                  style="max-width: 600px"
                  :model="ruleForm"
                  :rules="rules"
                  label-width="auto"
                  class="demo-ruleForm"
                  :size="formSize"
                  :label-position="'right'"
                  status-icon
                >
                  <el-form-item label="学校" prop="school">
                    <el-input v-model="ruleForm.school" />
                  </el-form-item>
                  <el-form-item label="学号" prop="id">
                    <el-input v-model="ruleForm.id" />
                  </el-form-item>
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" />
                  </el-form-item>
                  <el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="ruleForm.gender">
                      <el-radio border value="male">
                        男
                      </el-radio>
                      <el-radio border value="female">
                        女
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </ElForm>
              </div>
            </div>
          </div>
          <template #footer>
            <el-button type="primary" @click="submitForm(ruleFormRef)" class="beautiful-text">
              确认登录
            </el-button>
            <el-button @click="resetForm(ruleFormRef)" class="beautiful-text">
              重置
            </el-button>
          </template>
        </ElCard>
      </div>
    </div>
  </ElConfigProvider>
</template>

<style scoped lang="scss">
.beautiful-text {
  font-family: "Noto Sans SC", sans-serif;
  font-weight: bold;
}

.check-text {
  width: 100%;
  height: 250px;
  letter-spacing: 1px;
  font-size: 25px;
  font-weight: bold;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: start;
  padding: 10px 20px;
  box-sizing: border-box;
}
</style>
