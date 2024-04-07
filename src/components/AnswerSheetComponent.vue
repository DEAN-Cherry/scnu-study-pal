<script setup lang="ts">

const drawer = ref(false)
const direction = ref('rtl')
const radio1 = ref('Option 1')
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
</script>

<template>
  <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
    答题卡
  </el-button>
  <el-drawer v-model="drawer" :direction="direction" :size="'50%'">
    <template #header>
      <h4>答题卡</h4>
    </template>
    <template #default>
      <div flex flex-col>
        <div>

        </div>
        <div>
          <ElDivider>
            <h3> 题目1</h3>
          </ElDivider>
        </div>

        <div>
          <ElDivider>
            <h3> 题目1</h3>
          </ElDivider>
        </div>

        <div>

        </div>

        <div>

        </div>
      </div>
      <div>
        <el-radio v-model="radio1" value="Option 1" size="large"
        >Option 1
        </el-radio
        >
        <el-radio v-model="radio1" value="Option 2" size="large"
        >Option 2
        </el-radio
        >
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">

</style>
