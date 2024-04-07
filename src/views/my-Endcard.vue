<template>
  <div>
    <div class="login-box">
      <div class="title-box">AI智慧学伴辅助培养计算思维平台</div>
      <div class="form-box">
        <div class="carditem" v-for="(item, index) in card" :key="index">
          <el-divider content-position="left" style="font-size: 50px"
            >题目{{ index + 1 }}</el-divider
          >
          <div class="circlebox">
            <div
              class="circleitem"
              :style="BackGround(items)"
              @click="gototest(index, indexs)"
              v-for="(items, indexs) in item"
              :key="indexs"
            >
              {{ index + 1 }}.{{ indexs + 1 }}
            </div>
          </div>
        </div>
        <el-button type="primary" class="confirmbtn" plain @click="sendpape"
          >交卷并查看结果</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { $on, $off, $once, $emit } from '../utils/gogocodeTransfer'
import store from '@/store'
export default {
  data() {
    return {
      card: [],
      colors: {
        0: 'whitesmoke',
        1: 'blue',
        2: 'red',
      },
      fontcolors: {
        0: 'black',
        1: 'white',
        2: 'white',
      },
    }
  },
  mounted() {
    this.card = store.state.answer
  },
  methods: {
    BackGround(value) {
      return {
        backgroundColor: this.colors[value],
        color: this.fontcolors[value],
      }
    },
    gototest(a, b) {
      $emit(this, 'gotocard', { key: '2', a: a, b: b })
    },
    sendpape() {
      for (let i = 0; i < this.card.length; i++) {
        for (let j = 0; j < this.card[i].length; j++) {
          if (this.card[i][j] === 0) {
            return this.$message({
              message: '还有为做完的题目，请点击相应题号去完成题目！',
              type: 'warning',
              duration: 2000,
            })
          }
        }
      }
      console.log(store.state.score)
      console.log(store.state.alltime)
      $emit(this, 'gotocard', '6')
    },
  },
  emits: ['gotocard'],
}
</script>

<style lang="scss" scoped>
.login-box {
  width: 70%;
  height: 580px;
  background-color: rgb(81, 81, 240);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
}
.form-box {
  width: 95%;
  height: 85%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding: 15px 30px;
}
.title-box {
  width: 100%;
  font-family: 'Courier New', Courier, monospace;
  font-size: larger;
  font-weight: bolder;
  text-align: left;
  color: white;
  height: 10%;
  line-height: 50px;
  box-sizing: border-box;
  padding-left: 20px;
}
.carditem {
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
}
.el-divider__text {
  font-size: 20px;
  font-weight: bolder;
  font-family: cursive;
}
.circlebox {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0px 0;
  cursor: pointer;
}
.circleitem {
  text-align: center;
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: 0 30px;
  background-color: whitesmoke;
  border-radius: 50% 50%;
}
.confirmbtn {
  width: 150px;
  height: 40px;
  margin-top: 20px;
}
</style>
