<template>
  <div>
    <myhead></myhead>
    <div class="bigbox">
      <el-menu
        style="width: 18%"
        default-active="2"
        background-color="#f1f1f1"
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <el-icon><el-icon-s-home /></el-icon>
          <template v-slot:title>
            <span>首页</span>
          </template>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><el-icon-s-platform /></el-icon>
          <template v-slot:title>
            <span>考试测验</span>
          </template>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><el-icon-user /></el-icon>
          <template v-slot:title>
            <span>我的</span>
          </template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><el-icon-question /></el-icon>
          <template v-slot:title>
            <span>帮助</span>
          </template>
        </el-menu-item>
      </el-menu>
      <!--a here represent 总题目编号， b represents 小题号     -->
      <component
        :is="nowat"
        class="mainbox"
        @gotocard="handleSelect"
        :a="a"
        :b="b"
      >
      </component>
    </div>
  </div>
</template>

<script>
import {
  SHome as ElIconSHome,
  SPlatform as ElIconSPlatform,
  User as ElIconUser,
  Question as ElIconQuestion,
} from '@element-plus/icons'
import myhead from '@/components/my-Head.vue'
import myhome from '@/views/my-Home.vue'
import mytest from '@/views/my-Test.vue'
import myself from '@/views/my-Self.vue'
import myhelp from '@/views/my-Help.vue'
import endcard from '@/views/my-Endcard.vue'
import myresult from '@/views/my-Result.vue'

export default {
  components: {
    myhead,
    myhome,
    mytest,
    myself,
    myhelp,
    endcard,
    myresult,
    ElIconSHome,
    ElIconSPlatform,
    ElIconUser,
    ElIconQuestion,
  },
  data() {
    return {
      nowat: 'mytest',
      time: {
        hour: 0,
        minute: 0,
        second: 0,
        alltime: 0,
      },
      timer: null,
      a: 0,
      b: 0,
    }
  },
  mounted() {
    this.init()
  },
  unmounted() {
    clearInterval(this.timer)
  },
  methods: {
    init() {
      this.timer = setInterval(() => {
        this.alltime += 1
        this.hour = Number.parseInt(this.alltime / 60 / 60)
        this.minute = Number.parseInt((this.alltime / 60) % 60)
        this.second = Number.parseInt(this.alltime % 60)
      }, 1000)
    },
    handleSelect(key) {
      let obj
      if (key instanceof Object) {
        obj = key
        key = obj.key
        this.a = obj.a
        this.b = obj.b
      }
      console.log(this.a, this.b)
      switch (key) {
        case '1':
          this.nowat = 'myhome'
          break
        case '2':
          this.nowat = 'mytest'
          break
        case '3':
          this.nowat = 'myself'
          break
        case '4':
          this.nowat = 'myhelp'
          break
        case '5':
          this.nowat = 'endcard'
          break
        case '6':
          this.nowat = 'myresult'
          break
        default:
          this.nowat = 'mytest'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.bigbox {
  width: 100%;
  height: 89vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
}
.mainbox {
  width: 80%;
  height: 100%;
}
</style>
