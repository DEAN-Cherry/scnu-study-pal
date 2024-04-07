<template>
  <div class="sel-box">
    <div class="sel-head">
      <div class="sel-text">任务{{ topic }}</div>
      <el-icon><el-icon-s-claim /></el-icon>
      <mytime></mytime>
    </div>
    <seltopic @changetopic="changetopic" :a="a" :b="b"></seltopic>
    <mychat> </mychat>
  </div>
</template>

<script>
import { SClaim as ElIconSClaim } from '@element-plus/icons'
import { $on, $off, $once, $emit } from '../utils/gogocodeTransfer'
import mytime from './my-Time.vue'
import seltopic from './select-Topic.vue'
import mychat from './my-Chat.vue'
export default {
  components: {
    mytime,
    seltopic,
    mychat,
    ElIconSClaim,
  },
  data() {
    return {
      topic: 1,
    }
  },
  props: ['a', 'b'],
  mounted() {},
  methods: {
    gotocard() {
      $emit(this, 'gotocard', '5')
    },
    changetopic(e) {
      this.topic = e
    },
  },
  emits: ['gotocard'],
}
</script>

<style lang="scss" scoped>
.sel-box {
  width: 100%;
  height: 88%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 5px gray;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sel-head {
  width: 100%;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
}
.sel-head i {
  font-size: 22px;
}
.sel-head i:hover {
  color: lightblue;
}
.sel-text {
  font-size: 16px;
  font-weight: bolder;
  letter-spacing: 1px;
  font-family: 'Courier New', Courier, monospace;
}
</style>
