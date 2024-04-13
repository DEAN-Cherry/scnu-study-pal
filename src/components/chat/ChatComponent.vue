<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import { ROLE } from '@/typings/enum'

const chatInput = ref('')
const message = ref('')

const chatStore = useChatStore()
const quizStore = useQuizStore()

const { currentQuestion } = toRefs(quizStore)

const handleChat = async () => {
  chatStore.addChat(chatInput.value, ROLE.USER, currentQuestion.value.quizType, currentQuestion.value.topicId)
  const res = await getChat(quizStore.currentModelPort, { sender: 'user', message: chatInput.value })
  chatStore.addChat(res[0].text, ROLE.ASSISTANT, currentQuestion.value.quizType, currentQuestion.value.topicId)
  message.value = res[0].text
}
</script>

<template>
  <div
    h-full w-full
    flex flex-col
  >
    <div m-4>
      <p>聊天区</p>
      <div space-y-2 v-if="chatStore.chats">
        <template v-for="(item, index) of chatStore.chats[currentQuestion.quizType][currentQuestion.topicId]" :key="index">
          <MessageComponent :message="item.message" :reverse="item.role === 0" />
        </template>
      </div>
    </div>
    <div m2 grow items-center>
      <div
        mx-7
        mb-2
        flex items-center
        justify-center space-x-4
      >
        <div w-full>
          <ElInput v-model="chatInput" autosize clearable placeholder="请输入消息" />
        </div>
        <div>
          <ElButton plain type="primary" @click="handleChat">
            发送
          </ElButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
