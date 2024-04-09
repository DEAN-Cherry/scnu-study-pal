import type {
	Answer, Answers, AnswerSheet, QuestionMark, QuizResult
} from '@/typings/quiz'
import {
	ANSWER_TYPE, convertQuestionTypeToAnswerType, convertRawToQuestionType, QUESTION_TYPE, QUIZ_TYPE
} from '@/typings/enum'
import { getTopicNum } from '@/composables/quiz'

export const useQuizStore = defineStore('quiz', () => {
		const score = ref<number>(0)
		const result = ref<QuizResult>({
			[QUIZ_TYPE.BASE]: {
				score: 0,
				answerSheet: {
					0: {
						0: {
							type: ANSWER_TYPE.SINGLE_CHOICE,
							answer: '',
						},
					},
				},
			},
		})
		const answer = ref<Answer>('')
		const currentQuestion = ref<QuestionMark>({
			quizType: QUIZ_TYPE.BASE,
			topicId: 0,
			questionId: 0,
		})
		const currentPage = computed(() => {
			return currentQuestion.value.questionId + 1
		})
		const currentAnswer = computed(() => {
			return getCurrentAnswer()
		})


		// singleChoicePart
		const radio = ref<string>('A')
		// matchingPart
		const matching = ref<string[]>([])
		const checkList = ref<string[]>([])

		function updateQuestionMark(quizType: number, topicId: number, questionId: number) {
			currentQuestion.value = { quizType, topicId, questionId }
		}

		function initCurrentQuestion() {
			currentQuestion.value = {
				quizType: QUIZ_TYPE.BASE,
				topicId: 0,
				questionId: 0,
			}
		}

		function initResult(quizType: QUIZ_TYPE = QUIZ_TYPE.BASE) {
			if (!result.value) {
				const answer: Answer = ''
				const answers: Answers = { [0]: { type: ANSWER_TYPE.SINGLE_CHOICE, answer: answer } }
				const answerSheet: AnswerSheet = { [0]: answers }
				result.value = { [quizType]: { score: 0, answerSheet: answerSheet } }
			}
		}

		function submitAnswer() {
			const quizType = currentQuestion.value.quizType
			const topicId = currentQuestion.value.topicId
			const questionId = currentQuestion.value.questionId
			if (!result.value) {
				initResult(quizType)
			}

			const answerSheet = result.value[quizType].answerSheet
			const answers = answerSheet[topicId]
			const type = getAnswerTypeByIndex(quizType, topicId, questionId)
			const switchAnswer = (() => {
				switch (type) {
					case ANSWER_TYPE.SINGLE_CHOICE:
						console.log('radio.value', radio.value)
						return radio.value
					case ANSWER_TYPE.MULTIPLE_CHOICE:
						checkList.value.sort()
						return checkList.value
					case ANSWER_TYPE.SPECIAL_CHOICE:
						return {}
					case ANSWER_TYPE.MATCHING:
						console.log('matching.value', matching.value)
						return matching.value
					case ANSWER_TYPE.PROGRAMMING:
						const codeStore = useCodeStore()
						return codeStore.input
					default:
						return ''
				}
			})
			if (answers) {
				answers[questionId] = { type: type, answer: switchAnswer() }
			} else {
				answerSheet[topicId] = { [questionId]: { type: type, answer: switchAnswer() } }
			}
		}

		function getCurrentAnswerSheet() {
			const quizType = currentQuestion.value.quizType
			return result.value[quizType].answerSheet
		}

		function getCurrentAnswer(topicId: number = currentQuestion.value.topicId, questionId: number = currentQuestion.value.questionId) {
			const answerSheet = getCurrentAnswerSheet()
			const answers = answerSheet[topicId]
			if (answers) {
				return answers[questionId]
			} else return null
		}

		function isCorrect(topicId: number, questionId: number, answer: Answer) {
			const quizType = currentQuestion.value.quizType
			const topic = getTopic(quizType, topicId)
			const question = topic.questionList[questionId]
			const questionType = convertRawToQuestionType(question.type)
			const standardAnswer = question.answer
			switch (questionType) {
				case QUESTION_TYPE.SINGLE_CHOICE:
					return answer === standardAnswer![0]
				case QUESTION_TYPE.MULTIPLE_CHOICE:
					return JSON.stringify(answer) === JSON.stringify(standardAnswer)
				case QUESTION_TYPE.SPECIAL_CHOICE:
					return JSON.stringify(answer) === JSON.stringify(standardAnswer)
				case QUESTION_TYPE.MATCHING:
					return JSON.stringify(answer) === JSON.stringify(standardAnswer)
				default:
					return false
			}
		}

		// utils part
		function getAnswerTypeByIndex(quizType: QUIZ_TYPE = QUIZ_TYPE.BASE, topicId: number, questionId: number) {
			const topic = getTopic(quizType, topicId)
			const question = topic.questionList[questionId]
			const questionType = convertRawToQuestionType(question.type)
			return convertQuestionTypeToAnswerType(questionType)
		}


		function autoNextTopic() {
			const current = currentQuestion.value
			const topic = getTopic(current.quizType, current.topicId)
			if (current.questionId === topic.questionList.length - 1) {
				if (current.topicId < getTopicNum(current.quizType) - 1) {
					current.topicId++
					current.questionId = 0
				}
				//TODO 添加逻辑处理所有问题回答完毕的状态
			} else {
				current.questionId++
			}
		}

		function renderUserAnswer() {
			const storedAnswer = getCurrentAnswer()
			if (storedAnswer) {
				switch (storedAnswer.type) {
					case ANSWER_TYPE.SINGLE_CHOICE:
						radio.value = storedAnswer.answer as string
						answer.value = storedAnswer.answer as string
						break
					case ANSWER_TYPE.MULTIPLE_CHOICE:
						break
					case ANSWER_TYPE.SPECIAL_CHOICE:
						break
					case ANSWER_TYPE.MATCHING:
						matching.value = storedAnswer.answer as string[]
						break
					case ANSWER_TYPE.PROGRAMMING:
						break
				}
			}else {
				radio.value = ''
				matching.value = []
			}
		}

		return {
			score, result, answer, currentQuestion,
			currentAnswer, currentPage,
			radio, matching, checkList,
			initCurrentQuestion, initResult,
			submitAnswer,
			updateQuestionMark, autoNextTopic, isCorrect,
			getCurrentAnswerSheet, getCurrentAnswer, renderUserAnswer,
		}

	},
	{
		persist: {
			paths: [
				'score',
				'answer',
				'result',
				'currentQuestion',
				'currentPage',
			],
		},
	}
)
