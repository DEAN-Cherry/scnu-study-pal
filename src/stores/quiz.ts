import type {
	Answer, Answers, AnswerSheet, QuestionMark, QuizResult
} from '@/typings/quiz'
import {
	ANSWER_TYPE, convertQuestionTypeToAnswerType, convertRawToQuestionType, QUESTION_TYPE, QUIZ_TYPE
} from '@/typings/enum'
import { getTopicNum } from '@/composables/quiz'

export const useQuizStore = defineStore('quiz', () => {
		const basePortNumber = ref<number>(0)
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

		const currentModelPort = computed(() => {
			switch (currentQuestion.value.quizType) {
				case QUIZ_TYPE.BASE:
					return 5050 + currentQuestion.value.topicId
				case QUIZ_TYPE.ADVANCED:
					return 5060 + currentQuestion.value.topicId + basePortNumber.value
			}
		})
		const currentEvaluation = ref<string>('')


		// singleChoicePart
		const radio = ref<string>('A')
		// matchingPart
		const matching = ref<string[]>([])
		const checkList = ref<string[]>([])
		const programmingScore = ref<number>(0)

		function updateQuestionMark(quizType: number, topicId: number, questionId: number) {
			currentQuestion.value = { quizType, topicId, questionId }
		}

		function initCurrentQuestion(quizType: QUIZ_TYPE = QUIZ_TYPE.BASE) {
			currentQuestion.value = {
				quizType: quizType,
				topicId: 0,
				questionId: 0,
			}
		}

		function resetResult() {
			const answer: Answer = ''
			const answers: Answers = { [0]: { type: ANSWER_TYPE.SINGLE_CHOICE, answer: answer } }
			const answerSheet: AnswerSheet = { [0]: answers }
			result.value = { [QUIZ_TYPE.BASE]: { score: 0, answerSheet: answerSheet } }
		}

		function initResult(quizType: QUIZ_TYPE = QUIZ_TYPE.BASE) {
			const answer: Answer = ''
			const answers: Answers = { [0]: { type: ANSWER_TYPE.SINGLE_CHOICE, answer: answer } }
			const answerSheet: AnswerSheet = { [0]: answers }
			result.value = { [quizType]: { score: 0, answerSheet: answerSheet } }
			score.value = 0
		}

		function resetQuiz() {
			initCurrentQuestion()
			resetResult()
			matching.value = []
			radio.value = ''
			checkList.value = []
			programmingScore.value = 0
			score.value = 0
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
			score.value += judgeScore(topicId, questionId, switchAnswer())
			return switchAnswer()
		}

		function handleFeedback() {

		}

		function getCurrentFeedback() {

		}

		function getCurrentAnswerSheet(quizType: QUIZ_TYPE = currentQuestion.value.quizType) {
			return result.value[quizType].answerSheet
		}

		function getCurrentAnswer(topicId: number = currentQuestion.value.topicId, questionId: number = currentQuestion.value.questionId) {
			const answerSheet = getCurrentAnswerSheet()
			const answers = answerSheet[topicId]
			if (answers) {
				return answers[questionId]
			} else return null
		}

		function getStandardAnswer(topicId: number = currentQuestion.value.topicId, questionId: number = currentQuestion.value.questionId) {
			const quizType = currentQuestion.value.quizType
			const topic = getTopic(quizType, topicId)
			const question = topic.questionList[questionId]
			const standardAnswer = question.answer
			return standardAnswer
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
				case QUESTION_TYPE.PROGRAMMING:
					if (answer) {
						return -1
					}
					return ''
				default:
					return false
			}
		}

		function judgeScore(topicId: number, questionId: number, answer: Answer) {
			const quizType = currentQuestion.value.quizType
			const topic = getTopic(quizType, topicId)
			const question = topic.questionList[questionId]
			const questionType = convertRawToQuestionType(question.type)
			const standardAnswer = question.answer
			switch (questionType) {
				case QUESTION_TYPE.SINGLE_CHOICE:
					if (answer === standardAnswer![0]) {
						return question.score
					}
					return 0
				case QUESTION_TYPE.MULTIPLE_CHOICE:
					if (JSON.stringify(answer) === JSON.stringify(standardAnswer)) {
						return question.score * standardAnswer!.length
					} else {
						if ((answer as string[]).length > standardAnswer!.length) {
							return 0
						}
						if ((answer as string[]).length === 1) {
							for (const c in standardAnswer) {
								if (JSON.stringify(answer).includes(c)) {
									return question.score
								}
							}
						} else {
							return 0
						}
					}
					return 0
				case QUESTION_TYPE.SPECIAL_CHOICE:
					if (JSON.stringify(answer) === JSON.stringify(standardAnswer)) {
						return question.score
					}
					return 0
				case QUESTION_TYPE.MATCHING:
					if (JSON.stringify(answer) === JSON.stringify(standardAnswer)) {
						return question.score
					}
					return 0
				case QUESTION_TYPE.PROGRAMMING:
					if (answer) {
						return Number(programmingScore.value)
					}
					return 0
				default:
					return 0
			}
		}

		//advanced exam part

		// utils part
		function getAnswerTypeByIndex(quizType: QUIZ_TYPE = QUIZ_TYPE.BASE, topicId: number, questionId: number) {
			const topic = getTopic(quizType, topicId)
			const question = topic.questionList[questionId]
			const questionType = convertRawToQuestionType(question.type)
			return convertQuestionTypeToAnswerType(questionType)
		}

		function isLastQuestion() {
			const current = currentQuestion.value
			const topic = getTopic(current.quizType, current.topicId)
			if (current.questionId === topic.questionList.length - 1) {
				if (current.topicId < getTopicNum(current.quizType) - 1) {
					return true
				}
				// Here is the end of the quiz
				return -1
			}
			return false
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
			} else {
				radio.value = ''
				matching.value = []
			}
		}

		return {
			score, result, answer, basePortNumber,
			currentQuestion, currentAnswer, currentPage, currentModelPort, currentEvaluation,
			radio, matching, checkList, programmingScore,
			initCurrentQuestion, initResult, resetResult, resetQuiz,
			submitAnswer, handleFeedback, getCurrentFeedback,
			updateQuestionMark, autoNextTopic, isCorrect, isLastQuestion,
			getCurrentAnswerSheet, getCurrentAnswer, getStandardAnswer, renderUserAnswer,
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
