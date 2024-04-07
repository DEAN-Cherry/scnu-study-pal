import type {
	Answers, AnswerSheet, QuestionMark, QuizResult
} from '@/typings/quiz'
import { QUIZ_TYPE } from '@/typings/enum'

export const useQuizStore = defineStore('quiz', () => {
		const score = ref<number>(0)
		const result = ref<QuizResult[]>([])
		const currentQuestion = ref<QuestionMark>({
			quizType: QUIZ_TYPE.BASE,
			topicId: 0,
			questionId: 0,
		})
		const currentPage = computed(() => {
			return currentQuestion.value.questionId + 1
		})

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

		function initResult() {
			if (result.value.length === 0) {
				const answers: Answers[] = []
				const answerSheet: AnswerSheet = { [0]: answers }
				const quizResult: QuizResult = { quizType: QUIZ_TYPE.BASE, score: 0, answerSheet }
				result.value = [quizResult]
			}
		}

		return {
			score, result, currentQuestion, currentPage,
			initCurrentQuestion, initResult,
			updateQuestionMark,
		}

	},
	{
		persist: {
			paths: ['score',
				'result',
				'currentQuestion'],
		},
	}
)
