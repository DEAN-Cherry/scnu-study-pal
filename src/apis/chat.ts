import axios from 'axios'
import type { ChatRequest } from '@/typings/chat'

export const getChat = async (modelId: number, chatRequest: ChatRequest) => {
	const response = await axios.post(`/api/chat/${modelId}`, chatRequest)
	return response.data
}
