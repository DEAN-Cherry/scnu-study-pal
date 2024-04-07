<script lang="ts" setup>
// import {
//   Location,
//   Document,
//   Menu as IconMenu,
//   Setting
// } from '@element-plus/icons-vue'
//
const appStore = useAppStore()
const { isCollapsed } = toRefs(appStore)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :router="true"
    :collapse="isCollapsed"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="/app/home">
      <ElIcon>
        <IconMdiHome />
      </ElIcon>
      <template #title>
        首页
      </template>
    </el-menu-item>
    <el-menu-item index="/app/exam">
      <ElIcon>
        <IconEpPlatform />
      </ElIcon>
      <template #title>
        考试测验
      </template>
    </el-menu-item>
    <el-menu-item index="/app">
      <ElIcon>
        <IconMdiHome />
      </ElIcon>
      <template #title>
        BaseView
      </template>
    </el-menu-item>
    <!--    <el-sub-menu index="1">-->
    <!--      <template #title>-->
    <!--        <el-icon>-->
    <!--          <location/>-->
    <!--        </el-icon>-->
    <!--        <span>Navigator One</span>-->
    <!--      </template>-->
    <!--      <el-menu-item-group>-->
    <!--        <template #title><span>Group One</span></template>-->
    <!--        <el-menu-item index="1-1">item one</el-menu-item>-->
    <!--        <el-menu-item index="1-2">item two</el-menu-item>-->
    <!--      </el-menu-item-group>-->
    <!--      <el-menu-item-group title="Group Two">-->
    <!--        <el-menu-item index="1-3">item three</el-menu-item>-->
    <!--      </el-menu-item-group>-->
    <!--      <el-sub-menu index="1-4">-->
    <!--        <template #title><span>item four</span></template>-->
    <!--        <el-menu-item index="1-4-1">item one</el-menu-item>-->
    <!--      </el-sub-menu>-->
    <!--    </el-sub-menu>-->
    <!--    <el-menu-item index="2">-->
    <!--      <el-icon>-->
    <!--        <icon-menu/>-->
    <!--      </el-icon>-->
    <!--      <template #title>Navigator Two</template>-->
    <!--    </el-menu-item>-->
    <!--    <el-menu-item index="3" disabled>-->
    <!--      <el-icon>-->
    <!--        <document/>-->
    <!--      </el-icon>-->
    <!--      <template #title>Navigator Three</template>-->
    <!--    </el-menu-item>-->
    <!--    <el-menu-item index="4">-->
    <!--      <el-icon>-->
    <!--        <setting/>-->
    <!--      </el-icon>-->
    <!--      <template #title>Navigator Four</template>-->
    <!--    </el-menu-item>-->
  </el-menu>
</template>


