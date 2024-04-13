import type { ANSWER_TYPE } from '@/typings/enum'
import { QUESTION_TYPE, QUIZ_TYPE } from '@/typings/enum'

export type SingleChoiceQuestion = {
	id: number;
	type: QUESTION_TYPE.SINGLE_CHOICE;
	title: string;
	options: string[];
}

export type MultipleChoiceQuestion = {
	id: number;
	type: QUESTION_TYPE.MULTIPLE_CHOICE;
	title: string;
	options: string[];
}

export type SpecialChoiceQuestion = {
	id: number;
	type: QUESTION_TYPE.SPECIAL_CHOICE;
	title: string;
	options: string[];
}

export type MatchingQuestion = {
	id: number;
	type: QUESTION_TYPE.MATCHING;
	title: string;
	pairs: { prompt: string, answer: string }[];
}

export type ProgrammingQuestion = {
	id: number;
	type: QUESTION_TYPE.PROGRAMMING;
	title: string;
	placeholder?: string;
}

export type Question = SingleChoiceQuestion | MultipleChoiceQuestion | SpecialChoiceQuestion | MatchingQuestion | ProgrammingQuestion

export interface QuestionMark {
	quizType: QUIZ_TYPE
	topicId: number
	questionId: number
}

export type Answer = string | string[] | { [key: string]: string } | { [key: number]: string }

export interface Answers {
	[questionId: number]: {
		type: ANSWER_TYPE
		answer: Answer
	}
}

export interface AnswerSheet {
	[topicId: number]: Answers;
}

export interface QuizResult {
	[quizType: number]: {
		score: number
		answerSheet: AnswerSheet
	}
}

export interface Statement{
	type: string,
	correct: string,
	wrong: string
	text?: string
	case?: { [key: string]: string }
}

export interface Evaluation {
	score: number,
	level: string,
	comment: string
}

// export interface Exam {
// 	title: string,
//
// }
//
// export interface Topic {
// 	title: string,
// 	totalQuestion: number,
// 	questionList: Question[]
//
// }
