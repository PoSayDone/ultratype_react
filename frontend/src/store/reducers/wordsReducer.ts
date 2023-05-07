import {faker} from "@faker-js/faker";

export const NUMBER_OF_WORDS = 20;
export const generateWords = (count: number) => {
	return faker.random.words(count).toLowerCase()
}

export enum WordsActionTypes{
	SET_WORDS = "SET_WORDS"
}

interface SetWordsAction{
	type: WordsActionTypes.SET_WORDS,
	payload: string
}

interface WordsState{
	words: string
}

const defaulsState = {
	words: generateWords(NUMBER_OF_WORDS),
}

export type WordsActions =  SetWordsAction

export function wordsReducer(state : WordsState = defaulsState , action : WordsActions) : WordsState {
	switch (action.type){
		default:
			return state
		case WordsActionTypes.SET_WORDS:
			return {words: action.payload}
	}
}