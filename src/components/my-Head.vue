<template>
  <div class="headbox">
    <div class="head-title">AI智慧学伴辅助培养计算思维平台</div>
    <div class="icon-box">
      <el-icon><el-icon-refresh /></el-icon>
      <el-icon><el-icon-setting /></el-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.headbox {
  width: 100%;
  height: 50px;
  background-color: gray;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.head-title {
  background-color: rgb(51, 204, 255);
  height: 100%;
  width: 350px;
  line-height: 50px;
  letter-spacing: 1px;
  font-size: larger;
  font-weight: bolder;
  color: white;
  text-shadow: 5px 5px 5px black;
  box-sizing: border-box;
  border-right: 1px solid white;
}
.icon-box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 10%;
}
.icon-box i {
  font-size: 25px;
  color: whitesmoke;
}
</style>
