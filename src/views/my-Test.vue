<template>
  <div class="big-box">
    <div class="left-box">
      <div class="userinfo">
        <img
          src="../public/express.png"
          alt="头像"
        >
        <div class="info-text">
          <div class="big-text">
            <div>{{ userinfo.name }}</div>
            <div>{{ userinfo.stunumber }}</div>
          </div>
          <div class="small-text">
            <div>{{ userinfo.school }}</div>
            <div>{{ userinfo.sex }}</div>
          </div>
        </div>
      </div>
      <selbox
        @gotocard="gotocards"
        :a="a"
        :b="b"
      />
    </div>
    <div class="right-box">
      <CodeLayout />
    </div>
  </div>
</template>

<script>
import {
 $on, $off, $once, $emit
} from '../utils/gogocodeTransfer'
import store from '@/store'
import selbox from '@/components/my-Select.vue'
import CodeLayout from '@/views/code/CodeLayout.vue'
import MonacoEditor from '@/components/MonacoEditor.vue'
export default {
  data: function () {
    return {
      userinfo: {
        name: '',
        stunumber: '',
        sex: '',
        school: '',
      },
      topics: [],
    }
  },
  props: ['a', 'b'],
  components: {
    MonacoEditor,
    CodeLayout,
    selbox,
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      for (const i in store.state) {
        this.userinfo[i] = store.state[i]
      }
    },
    gotocards(e) {
      $emit(this, 'gotocard', e)
    },
  },
  emits: ['gotocard'],
}
</script>

<style lang="scss" scoped>
.big-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.left-box {
  width: 59%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
.right-box {
  width: 39%;
  height: 100%;
  background-color: antiquewhite;
}
.userinfo {
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 3px gray;
  width: 100%;
  height: 60px;
  padding-left: 15px;
  box-sizing: border-box;
  align-items: center;
}
.userinfo img {
  width: 50px;
  height: 50px;
  background-color: rgb(246, 244, 244);
  border-radius: 50%;
}
.info-text {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 40px;
  margin-left: 20px;
  align-items: flex-start;
  justify-content: space-between;
  .big-text {
    display: flex;
    flex-direction: row;
    min-width: 200px;
    color: gray;
    font-size: 18px;
    font-family: cursive;
    font-weight: bolder;
    justify-content: space-between;
  }
  .small-text {
    display: flex;
    flex-direction: row;
    min-width: 100px;
    color: grey;
    font-size: small;
    justify-content: space-between;
  }
}
</style>
