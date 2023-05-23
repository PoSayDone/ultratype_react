import { lettersToAddConst } from "../../constants/lettersToAddConst";
import { ILettersToAdd } from "../../models/ILettersToAdd";

let defaultState = lettersToAddConst

const localUserLettersToAdd = localStorage.getItem("userLettersToAdd")

if (localUserLettersToAdd !== null) {
    defaultState = JSON.parse(localUserLettersToAdd)
}

export enum LettersToAddActionTypes {
    REMOVE_LETTER = "REMOVE_LETTER",
    SET_LETTERS = "SET_LETTERS"
}

interface removeLetterAction {
    type: LettersToAddActionTypes.REMOVE_LETTER;
    payload: {
        lang: string
    };
}

interface setLettersAction {
    type: LettersToAddActionTypes.SET_LETTERS;
    payload: {
        lang: string
        letters: string
    };
}

export type LettersToAddActions =
    removeLetterAction |
    setLettersAction

export const lettersToAddReducer = (state = defaultState, action: LettersToAddActions) => {
    switch (action.type) {
        case LettersToAddActionTypes.SET_LETTERS:
            state[action.payload.lang] = {
                ...state[action.payload.lang],
                letters: action.payload.letters,
            };
            localStorage.setItem(`UserLettersToAdd`, JSON.stringify(state));
            return state;
        case LettersToAddActionTypes.REMOVE_LETTER:
            state[action.payload.lang] = {
                ...state[action.payload.lang],
                letters: state[action.payload.lang].letters.substring(1),
            };
            localStorage.setItem(`UserLettersToAdd`, JSON.stringify(state));
            return state;
        default:
            return state;
    }
};
