import { QUIZ_TYPE } from '@/typings/enum'
import { baseExam } from '@/data/topic'

/**
 * 具体的一个 topic 对象
 * @param quizType
 * @param topicId
 * @return 具体的一个 topic 对象
 */
export function getTopic(quizType: number, topicId: number) {
	const exam = getExam(quizType)
	return exam.topic[topicId]
}

export function getTopicNum(quizType: number) {
	return getExam(quizType).topic.length
}


export function getQuestionList(quizType: number, topicId: number) {
	const exam = getExam(quizType)
	return exam.topic[topicId].questionList
}

export function getQuestionByIndex(quizType: number, topicId: number, questionId: number) {
	const exam = getExam(quizType)
	return exam.topic[topicId].questionList[questionId]
}

export function getQuestionByList(questionList: never[], questionId: number) {
	return questionList[questionId]
}

export function getFeedbackList(quizType: number, topicId: number) {
	const exam = getExam(quizType)
	return exam.feedback[topicId]

}

export function getFeedbackByIndex(quizType: number, topicId: number, questionId: number) {
	const exam = getExam(quizType)
	return exam.feedback[topicId].statement[questionId]
}

export function getFeedbackByList(feedbackList: never[], questionId: number) {
	return feedbackList[questionId]
}

export function getExam(quizType: number) {
	switch (quizType) {
		case QUIZ_TYPE.BASE:
			return baseExam
	}
	return baseExam
}
