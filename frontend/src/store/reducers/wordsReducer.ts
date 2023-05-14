export enum WordsActionTypes {
    SET_WORDS = "SET_WORDS"
}

interface SetWordsAction {
    type: WordsActionTypes.SET_WORDS,
    payload: string
}

interface WordsState {
    words: string
}

const defaulsState = {
    words: ""
}

export type WordsActions = SetWordsAction

export function wordsReducer(state: WordsState = defaulsState, action: WordsActions): WordsState {
    switch (action.type) {
        default:
            return state
        case WordsActionTypes.SET_WORDS:
            return { words: action.payload }
    }
}