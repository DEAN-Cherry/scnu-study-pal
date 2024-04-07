<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import EditorComponent from '@/components/code/EditorComponent.vue'

const timeStore = useTimerStore()
const quizStore = useQuizStore()


onMounted(() => {
  timeStore.startTimer(45 * 60 * 1000)
  quizStore.initResult()
})
</script>

<template>
  <Splitpanes class="de-theme">
    <Pane min-size="30">
      <Splitpanes h="full" horizontal>
        <PaneComponent h-full>
          <QuestionComponent />
        </PaneComponent>
        <PaneComponent>
          <ChatComponent />
        </PaneComponent>
      </Splitpanes>
    </Pane>
    <Pane>
      <Splitpanes horizontal>
        <Pane h="4/5" rounded="2" bg="[#fdfdfe] dark:[#2b2b2b]">
          <div h-full>
            <EditorComponent />
          </div>
        </Pane>
        <Pane rounded="2" bg="[#fdfdfe] dark:[#2b2b2b]">
          <ConsoleComponent />
        </Pane>
      </Splitpanes>
    </Pane>
  </Splitpanes>
</template>

<style lang="scss">

.splitpanes.de-theme {
  .splitpanes__pane {
    overflow: auto;
  }

  .splitpanes__splitter {
    background-color: transparent;
    border-color: transparent;
    min-height: 1rem;
    min-width: 1rem;
    box-sizing: border-box;
    position: relative;
    flex-shrink: 0;

    &:before, &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: rgba(0, 0, 0, .15);

      .dark & {
        background-color: rgba(200, 200, 200, .15); /* 暗色模式下的背景颜色 */
      }

      transition: background-color 0.3s;
    }

    &:hover:before, &:hover:after {
      background-color: rgba(0, 0, 0, .55);

      .dark & {
        background-color: rgba(200, 200, 200, .55); /* 暗色模式下的背景颜色 */
      }
    }

    &:first-child {
      cursor: auto;
    }
  }
}

.de-theme {
  &.splitpanes .splitpanes .splitpanes__splitter {
    z-index: 1;
  }

  &.splitpanes--vertical > .splitpanes__splitter,
  .splitpanes--vertical > .splitpanes__splitter {
    width: 7px;
    margin-left: -1px;

    &:before, &:after {
      transform: translateY(-50%);
      width: 1px;
      height: 30px;
    }

    &:before {
      margin-left: -2px;
    }

    &:after {
      margin-left: 1px;
    }
  }

  &.splitpanes--horizontal > .splitpanes__splitter,
  .splitpanes--horizontal > .splitpanes__splitter {
    height: 7px;
    margin-top: -1px;

    &:before,
    &:after {
      transform: translateX(-50%);
      width: 30px;
      height: 1px;
    }

    &:before {
      margin-top: -2px;
    }

    &:after {
      margin-top: 1px;
    }
  }
}
</style>
