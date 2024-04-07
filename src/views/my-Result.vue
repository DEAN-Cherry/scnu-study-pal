<template>
  <div>
    <div class="login-box">
      <div class="title-box">AI智慧学伴辅助培养计算思维平台</div>
      <div class="form-box">
        <div class="firstbox">
          <div class="leftbox">
            <div class="left-head">
              <p>
                得分：<span style="color: red">{{ score }}分</span>
              </p>
              <p>总分：100分</p>
            </div>
            <div class="left-end">
              <el-icon
                style="
                  font-size: 40px;
                  color: blue;
                  font-weight: bolder;
                  margin-right: 20px;
                "
                ><el-icon-timer
              /></el-icon>
              <div>
                {{ hour < 10 ? '0' + hour : hour }}:{{
                  minute < 10 ? '0' + minute : minute
                }}:{{ second < 10 ? '0' + second : second }}
              </div>
            </div>
          </div>
          <div class="rightbox">
            <el-button type="success" round @click="testagain" class="rightbtn"
              >继续测试</el-button
            >
          </div>
        </div>
        <div class="secondbox">您的思维计算水平是：{{ grade }}</div>
        <div class="thirdbox">
          {{ text[grade] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Timer as ElIconTimer } from '@element-plus/icons'
import { $on, $off, $once, $emit } from '../utils/gogocodeTransfer'
import store from '@/store'

export default {
  components: {
    ElIconTimer,
  },
  data() {
    return {
      score: 0,
      alltime: 0,
      grade: '',
      hour: 0,
      minute: 0,
      second: '',
      text: {
        'A++':
          '恭喜你！你已经取得了完美的成绩。为了进一步提高你的计算思维能力，我建议你继续保持良好的学习态度，并积极挑战自己。因为你已经具备了良好的基础，重点可以放在练习更多的高级题目。',
        'A+': '恭喜你！你已经取得了出色的成绩。为了进一步提高你的计算思维能力，我建议你继续保持良好的学习态度，并积极挑战自己。可以做一道中级题目巩固基础，重点可以放在练习更多的高级题目。',
        'A-': '恭喜你！你已经取得了良好的成绩。为了进一步提高你的计算思维能力，我建议你继续保持良好的学习态度，并积极挑战自己。可以做一点中级题目和解决更多难的高级题目。这将帮助你巩固基础知识，并提高你的问题解决能力。',
        B: '恭喜你！你已经取得了良好的成绩。为了进一步提高你的计算思维能力，我建议你继续保持良好的学习态度，并不断挑战自己。尝试解决更多难度适中的题目，中级题目可以居多，高级可以挑战以下。你一定可以取得更高的成绩！祝你在未来的学习中取得更大的进步！',
        C: '恭喜你！你已经取得了及格的成绩。为了进一步提高你的计算思维能力，我建议你继续努力，并尝试解决更多的题目。除了可以做初级题目外，你也可以逐渐挑战一些中级题目。这样可以巩固基础知识，并进一步提高你的计算思维能力。你一定可以取得更高的成绩！祝你在未来的学习中取得更大的进步！',
        D: '为了提高你的计算思维能力，我建议你多做一些初级题目。通过解决更多的初级题目。你可以挑战自己并提升自己的计算思维能力。你一定可以取得更高的成绩！祝你在未来的学习中取得更大的进步！',
      },
    }
  },
  mounted() {
    this.alltime = store.state.alltime
    this.hour = Number.parseInt(this.alltime / 60 / 60)
    this.minute = Number.parseInt((this.alltime / 60) % 60)
    this.second = Number.parseInt(this.alltime % 60)
    this.score = store.state.score
    this.alltime = (store.state.alltime / 60).toFixed()
    let cha = 0
    if (this.alltime < 44) {
      cha = 0
    } else if (this.alltime < 55) {
      cha = 5
    } else if (this.alltime < 65) {
      cha = 10
    } else if (this.alltime < 75) {
      cha = 15
    } else if (this.alltime < 85) {
      cha = 20
    } else {
      cha = 25
    }
    this.score = this.score - cha
    console.log(this.alltime)
    console.log(this.score)
    if (this.score < 44) {
      this.grade = 'D'
    } else if (this.score < 64) {
      this.grade = 'C'
    } else if (this.score < 75) {
      this.grade = 'B'
    } else if (this.score < 84) {
      this.grade = 'A-'
    } else if (this.score < 99) {
      this.grade = 'A+'
    } else {
      this.grade = 'A++'
    }
    console.log(this.grade)
    console.log(this.text[this.grade])
  },
  methods: {
    testagain() {
      store.commit('clearflag')
      $emit(this, 'gotocard', '2')
    },
  },
  emits: ['gotocard'],
}
</script>

<style lang="scss" scoped>
.login-box {
  width: 65%;
  height: 550px;
  background-color: rgb(81, 81, 240);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 25px;
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
.firstbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
}
.leftbox {
  width: 50%;
  text-align: left;
}
.left-head {
  width: 100%;
  text-align: center;
  font-size: 25px;
  font-weight: bolder;
  letter-spacing: 1px;
}
.left-end {
  display: flex;
  flex-direction: row;
  letter-spacing: 1px;
  justify-content: fle;
  font-size: 25px;
  align-items: center;
  margin-left: 50px;
}
.rightbox {
  width: 50%;
}
.rightbtn {
  width: 150px;
  height: 50px;
  font-size: larger;
  font-family: cursive;
  font-weight: bold;
  letter-spacing: 1px;
}
.secondbox {
  width: 100%;
  text-align: left;
  margin: 15px 0;
  margin-left: 100px;
  font-size: 30px;
  color: blue;
  text-shadow: 1px 1px 5px gray;
}
.thirdbox {
  margin: 15px 0;
  text-align: left;
  font-size: large;
  font-family: fantasy;
  letter-spacing: 1px;
}
</style>
