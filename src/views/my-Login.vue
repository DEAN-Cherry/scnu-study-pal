<template>
  <div>
    <div class="login-box">
      <div class="title-box">AI智慧学伴辅助培养计算思维平台</div>
      <div class="form-box" v-if="!next">
        <div class="head-box">
          <div style="font-size: large; font-weight: bolder">登录</div>
          <div style="width: 50%">
            <el-divider content-position="center" direction="horizontal"
              >学生注册</el-divider
            >
          </div>
        </div>
        <el-form label-width="40px" style="width: 60%">
          <el-form-item label="学校">
            <el-input v-model="school"></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="stunumber"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              style="width: 200px; margin-left: -40px"
              >确认登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div v-else class="checkbox">
        <div class="checktext">
          &nbsp;&nbsp;&nbsp;&nbsp;
          该系统的设计是为了测验你的计算思维水平共有四道大题，为了保证测验结果的准确，请您如实作答。<span
            style="color: red"
            >每道小题完成之后可以和AI智慧学伴讨论交流，交流时间将计入总时长，做题的时间也会影响计算思维水平的结果。</span
          >
        </div>
        <el-button @click="getin" class="checkbtn">开始测验</el-button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data() {
    return {
      name: '',
      sex: '',
      school: '',
      stunumber: '',
      next: false,
    }
  },
  methods: {
    onSubmit() {
      if (this.name === '') {
        this.$alert('信息不能为空', '输入错误', {
          confirmButtonText: '确定',
          callback: (action) => {
            this.$message({
              type: 'info',
              message: '请重新输入',
            })
          },
        })
      } else {
        this.next = true
      }
    },
    getin() {
      store.commit('getinfo', {
        name: this.name,
        stunumber: this.stunumber,
        school: this.school,
        sex: this.sex,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.login-box {
  width: 50%;
  height: 500px;
  background-color: rgb(81, 81, 240);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 100px;
}
.form-box {
  width: 95%;
  height: 85%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.head-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-bottom: 10px;
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
.checkbox {
  width: 95%;
  height: 85%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.checktext {
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
.checkbtn {
  background-color: blue;
  width: 150px;
  height: 50px;
  color: white;
  font-size: larger;
}
</style>
