<script setup lang="ts">

import { toggleDark } from '@/composables'

const activeIndex = ref('1')
const appStore = useAppStore()
const { isCollapsed } = toRefs(appStore)
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0" class="">
      <p
        from-blue-600 to-purple-500 bg-gradient-to-r
        bg-clip-text
        text-2xl text-transparent font-bold
      >
        AI智慧学伴辅助培养计算思维平台
      </p>
    </el-menu-item>

    <div class="grow" />
    <!--    <el-menu-item index="1">Processing Center</el-menu-item>-->
    <!--    <el-sub-menu index="2">-->
    <!--      <template #title>Workspace</template>-->
    <!--      <el-menu-item index="2-1">item one</el-menu-item>-->
    <!--      <el-menu-item index="2-2">item two</el-menu-item>-->
    <!--      <el-menu-item index="2-3">item three</el-menu-item>-->
    <!--      <el-sub-menu index="2-4">-->
    <!--        <template #title>item four</template>-->
    <!--        <el-menu-item index="2-4-1">item one</el-menu-item>-->
    <!--        <el-menu-item index="2-4-2">item two</el-menu-item>-->
    <!--        <el-menu-item index="2-4-3">item three</el-menu-item>-->
    <!--      </el-sub-menu>-->
    <!--    </el-sub-menu>-->
    <el-menu-item h="full" @click="toggleDark()">
      <button
        class="button-height w-full cursor-pointer border-none bg-transparent"
      >
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>
    <div flex items-center justify-center>
      <ElSwitch v-model="isCollapsed" active-text="收起" inactive-text="展开" />
    </div>
    <el-menu-item h="full">
      <button
        class="button-height w-full cursor-pointer border-none bg-transparent"
      >
        <ElIcon>
          <IconEpRefresh />
        </ElIcon>
      </button>
    </el-menu-item>

    <el-menu-item h="full">
      <button
        class="button-height w-full cursor-pointer border-none bg-transparent"
      >
        <ElIcon>
          <IconEpSetting />
        </ElIcon>
      </button>
    </el-menu-item>
  </el-menu>
</template>

<style scoped lang="scss">
.button-height {
  height: var(--ep-menu-item-height);
}

.head-box {
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
