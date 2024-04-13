import { type ROLE } from './enum'

export interface ChatRequest {
	sender: string
	message: string
}

export interface Chat {
	role: ROLE
	message: string
}

export interface Chats {
	[topicId: number]: Chat[]
}

export interface ChatData {
	[exam: number]: Chats
}
