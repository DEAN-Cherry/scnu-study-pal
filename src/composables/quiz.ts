import { convertRawToQuestionType, QUESTION_TYPE, QUIZ_TYPE } from '@/typings/enum'
import { advancedExam, baseExam } from '@/data/topic'
import { evaluations } from '@/data/evaluation'
import type { Answer, Statement } from '@/typings/quiz'

/**
 * 具体的一个 topic 对象
 * @param quizType
 * @param topicId
 * @param evaluation
 * @return 具体的一个 topic 对象
 */
export function getTopic(quizType: number, topicId: number, evaluation: string = 'D') {
	const exam = getExam(quizType, evaluation)
	// switch (quizType) {
	// 	case QUIZ_TYPE.BASE:
	// 		return baseExam.topic[topicId]
	// 	case QUIZ_TYPE.ADVANCED:
	// 		return advancedExam.topic[topicId]
	// 		break
	// 	default:
	// 		return baseExam.topic[topicId]
	//
	// }
	return exam.topic[topicId]
}

export function getTopicNum(quizType: number) {
	const exam = getExam(quizType)
	// switch (quizType) {
	// 	case QUIZ_TYPE.BASE:
	// 		return baseExam.topic.length
	// 	case QUIZ_TYPE.ADVANCED:
	// return advancedExam.topic.length
	// 		break
	// 	default:
	// 		return baseExam.topic.length
	// }
	return exam.topic.length
}


export function getQuestionList(quizType: number, topicId: number) {
	const exam = getExam(quizType)
	return exam.topic[topicId].questionList
	// switch (quizType) {
	// 	case QUIZ_TYPE.BASE:
	// 		return baseExam.topic[topicId].questionList
	// 	case QUIZ_TYPE.ADVANCED:
	// return advancedExam.topic[topicId].questionList
	// 		break
	// 	default:
	// 		return baseExam.topic[topicId].questionList
	// }
}

export function getQuestionByIndex(quizType: number, topicId: number, questionId: number) {
	// switch (quizType) {
	// 	case QUIZ_TYPE.BASE:
	// 		return baseExam.topic[topicId].questionList[questionId]
	// 	case QUIZ_TYPE.ADVANCED:
	// 		// return advancedExam.topic[topicId].questionList[questionId]
	// 		break
	// 	default:
	// 		return baseExam.topic[topicId].questionList[questionId]
	// }
	const exam = getExam(quizType)
	return exam.topic[topicId].questionList[questionId]
}

export function getQuestionByList(questionList: never[], questionId: number) {
	return questionList[questionId]
}

export function getFeedbackList(quizType: number, topicId: number) {
	// switch (quizType) {
	// 	case QUIZ_TYPE.BASE:
	// 		return baseExam.feedback[topicId].statement
	// 	case QUIZ_TYPE.ADVANCED:
	// 		// return exam.feedback[topicId].statement
	// 		break
	// 	default:
	// 		return baseExam.feedback[topicId].statement
	// }
	const exam = getExam(quizType)
	return exam.feedback[topicId]
}

export function getFeedbackByIndex(quizType: number, topicId: number, questionId: number) {
	// switch (quizType) {
	// 	case QUIZ_TYPE.BASE:
	// 		return baseExam.feedback[topicId].statement[questionId]
	// 	case QUIZ_TYPE.ADVANCED:
	// 		// return exam.feedback[topicId].statement[questionId]
	// 		break
	// 	default:
	// 		return baseExam.feedback[topicId].statement[questionId]
	// }
	const exam = getExam(quizType)
	return exam.feedback[topicId].statement[questionId] as Statement
}

export function getSummaryByIndex(quizType: number, topicId: number) {
	const exam = getExam(quizType)
	return exam.feedback[topicId].summary
}

export function getStatementTextByType(statement: Statement, answer: Answer, standardAnswer: string[] | undefined) {
	const type = convertRawToQuestionType(statement.type)
	if (!standardAnswer) {
		return ''
	}
	switch (type) {
		case QUESTION_TYPE.SINGLE_CHOICE:
			if (answer === standardAnswer[0]) {
				return statement.correct
			} else {
				return statement.wrong
			}
		case QUESTION_TYPE.MULTIPLE_CHOICE:
			if (JSON.stringify(answer) === JSON.stringify(standardAnswer)) {
				return statement.correct
			} else {
				console.log('statement', statement)
				if ((answer as string[]).length > standardAnswer.length) {
					return statement.wrong
				}
				if (statement.case) {
					for (const c in statement!.case) {

						if (JSON.stringify(answer).includes(c)) {
							return statement!.case[c]
						}
					}
				} else {
					return statement.wrong
				}
			}
		case QUESTION_TYPE.SPECIAL_CHOICE:
			return ''
		case QUESTION_TYPE.MATCHING:
			return statement.text
		case QUESTION_TYPE.PROGRAMMING:
			return ''
		default:
			return ''

	}

}

export function getFeedbackByList(feedbackList: never[], questionId: number) {
	return feedbackList[questionId]
}

export function getEvaluationByScore(score: number) {
	for (const evaluation of evaluations) {
		if (score <= evaluation.score) {
			return evaluation
		}else {
			return evaluations[evaluations.length - 1]
		}
	}
}

export function getExam(quizType: number, evaluation: string = 'D') {
	switch (quizType) {
		case QUIZ_TYPE.BASE:
			return baseExam
		case QUIZ_TYPE.ADVANCED:
			const quizStore = useQuizStore()
			switch (evaluation) {
				case 'D':
					quizStore.basePortNumber = 0
					return advancedExam[0]
				case 'C':
					quizStore.basePortNumber = 1
					return advancedExam[0]
				case 'B':
					quizStore.basePortNumber = 4
					return advancedExam[1]
				case 'A-':
					quizStore.basePortNumber = 4
					return advancedExam[1]
				case 'A+':
					quizStore.basePortNumber = 6
					return advancedExam[2]
				case 'A++':
					quizStore.basePortNumber = 6
					return advancedExam[2]
				default:
					return advancedExam[0]
			}
		default:
			return baseExam
	}
}

