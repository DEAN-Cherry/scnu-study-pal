import type { Chat, ChatData, Chats } from '@/typings/chat'
import { QUIZ_TYPE, ROLE } from '@/typings/enum'

export const useChatStore = defineStore('chat', () => {

	const chats = ref<ChatData>()

	function initChats(quizType: QUIZ_TYPE) {
		const Chats = { [0]: [] }
		const chatData: ChatData = { [quizType]: Chats }
		chats.value = chatData
	}

	function addChat(message: string, role: ROLE = ROLE.USER, quizType: QUIZ_TYPE, topicId: number) {
		if (!chats.value) {
			initChats(quizType)
		}

		if (chats.value) {
			const chat: Chat = { role: role, message: message }
			const chatList = chats.value[quizType]
			chatList[topicId].push(chat)
		}
	}

	return {
		chats,
		initChats,
		addChat,
	}
})
