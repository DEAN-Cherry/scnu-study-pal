interface QuestionTypeMapType {
	[key: number]: string
}

interface RawMapType {
	[key: string]: QUESTION_TYPE

}

export enum QUIZ_TYPE {
	BASE,
	ADVANCED
}

export enum ANSWER_TYPE {
	SINGLE_CHOICE,
	MULTIPLE_CHOICE,
	SPECIAL_CHOICE,
	MATCHING,
	PROGRAMMING
}

export enum QUESTION_TYPE {
	SINGLE_CHOICE,
	MULTIPLE_CHOICE,
	SPECIAL_CHOICE,
	MATCHING,
	PROGRAMMING
}

export enum ROLE{
	USER,
	ASSISTANT
}

const questionTypeMapRaw: QuestionTypeMapType = {
	[QUESTION_TYPE.SINGLE_CHOICE]: 'singleChoice',
	[QUESTION_TYPE.MULTIPLE_CHOICE]: 'multipleChoice',
	[QUESTION_TYPE.SPECIAL_CHOICE]: 'specialChoice',
	[QUESTION_TYPE.MATCHING]: 'matching',
	[QUESTION_TYPE.PROGRAMMING]: 'programming',
}

const rawMapQuestionType: RawMapType = {
	'singleChoice': QUESTION_TYPE.SINGLE_CHOICE,
	'multipleChoice': QUESTION_TYPE.MULTIPLE_CHOICE,
	'specialChoice': QUESTION_TYPE.SPECIAL_CHOICE,
	'matching': QUESTION_TYPE.MATCHING,
	'programming': QUESTION_TYPE.PROGRAMMING,
}

const answerToQuestionMap: { [key in ANSWER_TYPE]: QUESTION_TYPE } = {
	[ANSWER_TYPE.SINGLE_CHOICE]: QUESTION_TYPE.SINGLE_CHOICE,
	[ANSWER_TYPE.MULTIPLE_CHOICE]: QUESTION_TYPE.MULTIPLE_CHOICE,
	[ANSWER_TYPE.SPECIAL_CHOICE]: QUESTION_TYPE.SPECIAL_CHOICE,
	[ANSWER_TYPE.MATCHING]: QUESTION_TYPE.MATCHING,
	[ANSWER_TYPE.PROGRAMMING]: QUESTION_TYPE.PROGRAMMING,
}

const questionToAnswerMap: { [key in QUESTION_TYPE]: ANSWER_TYPE } = {
	[QUESTION_TYPE.SINGLE_CHOICE]: ANSWER_TYPE.SINGLE_CHOICE,
	[QUESTION_TYPE.MULTIPLE_CHOICE]: ANSWER_TYPE.MULTIPLE_CHOICE,
	[QUESTION_TYPE.SPECIAL_CHOICE]: ANSWER_TYPE.SPECIAL_CHOICE,
	[QUESTION_TYPE.MATCHING]: ANSWER_TYPE.MATCHING,
	[QUESTION_TYPE.PROGRAMMING]: ANSWER_TYPE.PROGRAMMING,

}

// 使用映射表的示例
export function convertAnswerTypeToQuestionType(answerType: ANSWER_TYPE): QUESTION_TYPE {
	return answerToQuestionMap[answerType]
}

export function convertQuestionTypeToAnswerType(questionType: QUESTION_TYPE): ANSWER_TYPE {
	return questionToAnswerMap[questionType]

}


export function convertRawToQuestionType(raw: string): QUESTION_TYPE {
	return rawMapQuestionType[raw]
}

export function convertQuestionTypeToRaw(questionType: QUESTION_TYPE): string {
	return questionTypeMapRaw[questionType]
}
