<template>
  <div class="time-box">
    <el-icon><el-icon-alarm-clock /></el-icon>
    <div>
      {{ hour < 10 ? '0' + hour : hour }}:{{
        minute < 10 ? '0' + minute : minute
      }}:{{ second < 10 ? '0' + second : second }}
    </div>
  </div>
</template>

<script>
import { AlarmClock as ElIconAlarmClock } from '@element-plus/icons'
import store from '@/store'

export default {
  components: {
    ElIconAlarmClock,
  },
  data() {
    return {
      hour: 0,
      minute: 0,
      second: 0,
      alltime: 0,
      timer: null,
    }
  },
  mounted() {
    this.alltime = store.state.alltime
    this.timer = setInterval(() => {
      this.alltime += 1
      this.hour = Number.parseInt(this.alltime / 60 / 60)
      this.minute = Number.parseInt((this.alltime / 60) % 60)
      this.second = Number.parseInt(this.alltime % 60)
    }, 1000)
  },
  unmounted() {
    store.commit('settime', this.alltime)
    clearInterval(this.timer)
  },
}
</script>

<style lang="scss" scoped>
.time-box {
  display: flex;
  flex-direction: row;
  width: 110px;
  justify-content: space-between;
  align-items: center;
  font-size: medium;
  letter-spacing: 1px;
  color: gray;
}
.time-box i {
  font-size: 20px;
  font-weight: bolder;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: red;
}
</style>
