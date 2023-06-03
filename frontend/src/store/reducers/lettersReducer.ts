import { lettersConst } from "../../constants/lettersConst";
import { ILetters } from "../../models/ILetters";

const calculateWpm = (typed: number, errors: number, time: number) => {
    const typedRight = typed - errors <= 0 ? 0 : typed - errors;
    const wpm = typedRight / 5 / (time / 1000 / 60);
    return wpm;
};

const CalculateErrorCoefficient = (
    wpm: number,
    minWpm: number,
    maxWpm: number,
    minCoef: number,
    maxCoef: number
) => {
    // Используем линейную интерполяцию
    // Для минимальнго wpm выведет minCoef, для максимального wpm maxCoef, для промежуточных значения между
    const errorCoefficient =
        minCoef + ((wpm - minWpm) * (maxCoef - minCoef)) / (maxWpm - minWpm);
    if (errorCoefficient >= maxCoef) {
        return maxCoef;
    }
    return errorCoefficient;
};

const calculateConfidence = (errorRate: number, wpm: number) => {
    const errorFactor = 1 - errorRate;
    const averageWpm = 50;
    const wpmFactor = wpm / averageWpm;
    const errorCoefficient = CalculateErrorCoefficient(wpm, 0, 40, 0.55, 0.65);
    const wpmCoefficient = 1 - errorCoefficient;
    const confidence =
        errorCoefficient * errorFactor + wpmCoefficient * wpmFactor;
    if (confidence < 0) return 0;
    if (confidence > 1) return 1;
    return confidence;
};


const localUserLetters = localStorage.getItem("userLetters")
const initialState: ILetters = localUserLetters !== null ? JSON.parse(localUserLetters) : lettersConst;
const defaultState: ILetters = JSON.parse(JSON.stringify(initialState));

export enum LettersActionTypes {
    SET_LETTERS = "SET_LETTERS",
    SET_WPM = "SET_WPM",
    SET_ERROR_RATE = "SET_ERROR_RATE",
    SET_CONFIDENCE = "SET_CONFIDENCE",
    ADD_LETTER = "ADD_LETTER",
    INCREMENT_TYPED_COUNTER = "INCREMENT_TYPED_COUNTER",
    INCREMENT_ERROR_COUNTER = "INCREMENT_ERROR_COUNTER",
    CALCULATE_CONFIDENCE = "CALCULATE_CONFIDENCE",
    CALCULATE_WPM = "CALCULATE_WPM",
    CALCULATE_ERROR_RATE = "CALCULATE_ERROR_RATE",
    SET_TIME_ELAPSED = "SET_TIME_ELAPSED",
    ADD_TIME_ELAPSED = "ADD_TIME_ELAPSED",
    RESET = "RESET",
}

interface SetLetters {
    type: LettersActionTypes.SET_LETTERS;
    payload: ILetters
}

interface SetWPMAction {
    type: LettersActionTypes.SET_WPM;
    payload: {
        lang: string
        letter: string;
        value: number;
    };
}

interface SetErrorRateAction {
    type: LettersActionTypes.SET_ERROR_RATE;
    payload: {
        lang: string
        letter: string;
        value: number;
    };
}

interface SetConfidence {
    type: LettersActionTypes.SET_CONFIDENCE;
    payload: {
        lang: string
        letter: string;
        value: number;
    };
}

interface AddLetter {
    type: LettersActionTypes.ADD_LETTER;
    payload: {
        lang: string
        letter: string;
    };
}

interface IncrementTypedCounter {
    type: LettersActionTypes.INCREMENT_TYPED_COUNTER;
    payload: {
        lang: string
        letter: string;
    };
}

interface IncrementErrorCounter {
    type: LettersActionTypes.INCREMENT_ERROR_COUNTER;
    payload: {
        lang: string
        letter: string;
    };
}

interface CalculateErrorRate {
    type: LettersActionTypes.CALCULATE_ERROR_RATE;
    payload: {
        lang: string
        letter: string;
    };
}
interface CalculateConfidence {
    type: LettersActionTypes.CALCULATE_CONFIDENCE;
    payload: {
        lang: string
        letter: string;
    };
}

interface CalculateWpm {
    type: LettersActionTypes.CALCULATE_WPM;
    payload: {
        lang: string
        letter: string;
    };
}

interface SetTimeElapsed {
    type: LettersActionTypes.SET_TIME_ELAPSED;
    payload: {
        lang: string
        letter: string;
        value: number;
    };
}

interface AddTimeElapsed {
    type: LettersActionTypes.ADD_TIME_ELAPSED;
    payload: {
        lang: string
        letter: string;
        value: number;
    };
}

interface ResetAction {
    type: LettersActionTypes.RESET;
}

export type LettersActions =
    | SetWPMAction
    | SetErrorRateAction
    | SetConfidence
    | AddLetter
    | IncrementErrorCounter
    | IncrementTypedCounter
    | CalculateErrorRate
    | CalculateConfidence
    | SetTimeElapsed
    | AddTimeElapsed
    | CalculateWpm
    | ResetAction
    | SetLetters

export const lettersReducer = (state = defaultState, action: LettersActions) => {
    switch (action.type) {
        case LettersActionTypes.SET_WPM:
            state[action.payload.lang][action.payload.letter] = {
                ...state[action.payload.lang][action.payload.letter],
                wpm: action.payload.value,
            };
            return state;
        case LettersActionTypes.SET_ERROR_RATE:
            state[action.payload.lang][action.payload.letter] = {
                ...state[action.payload.lang][action.payload.letter],
                errorRate: action.payload.value,
            };
            return state;
        case LettersActionTypes.SET_CONFIDENCE:
            state[action.payload.lang][action.payload.letter] = {
                ...state[action.payload.lang][action.payload.letter],
                confidence: action.payload.value,
            };
            return state;
        case LettersActionTypes.ADD_LETTER:
            state[action.payload.lang][action.payload.letter] = {
                wpm: 0,
                errorRate: 0,
                confidence: 0,
                typedCounter: 0,
                errorCounter: 0,
                timeElapsed: 0,
            };
            return state;
        case LettersActionTypes.INCREMENT_TYPED_COUNTER:
            state[action.payload.lang][action.payload.letter] = {
                ...state[action.payload.lang][action.payload.letter],
                typedCounter: state[action.payload.lang][action.payload.letter].typedCounter + 1,
            };
            return state;
        case LettersActionTypes.INCREMENT_ERROR_COUNTER:
            state[action.payload.lang][action.payload.letter] = {
                ...state[action.payload.lang][action.payload.letter],
                errorCounter: state[action.payload.lang][action.payload.letter].errorCounter + 1,
            };
            return state;
        case LettersActionTypes.CALCULATE_ERROR_RATE:
            state[action.payload.lang][action.payload.letter] = {
                ...state[action.payload.lang][action.payload.letter],
                errorRate:
                    state[action.payload.lang][action.payload.letter].errorCounter /
                    state[action.payload.lang][action.payload.letter].typedCounter,
            };
            return state;
        case LettersActionTypes.CALCULATE_WPM:
            state[action.payload.lang][action.payload.letter] = {
                ...state[action.payload.lang][action.payload.letter],
                wpm: calculateWpm(
                    state[action.payload.lang][action.payload.letter].typedCounter,
                    state[action.payload.lang][action.payload.letter].errorCounter,
                    state[action.payload.lang][action.payload.letter].timeElapsed
                ),
            };
            return state;
        case LettersActionTypes.CALCULATE_CONFIDENCE:
            state[action.payload.lang][action.payload.letter] = {
                ...state[action.payload.lang][action.payload.letter],
                confidence: calculateConfidence(
                    state[action.payload.lang][action.payload.letter].errorRate,
                    state[action.payload.lang][action.payload.letter].wpm
                ),
            };
            return state;
        case LettersActionTypes.SET_TIME_ELAPSED:
            state[action.payload.lang][action.payload.letter] = {
                ...state[action.payload.lang][action.payload.letter],
                timeElapsed: action.payload.value,
            };
            return state;
        case LettersActionTypes.ADD_TIME_ELAPSED:
            state[action.payload.lang][action.payload.letter] = {
                ...state[action.payload.lang][action.payload.letter],
                timeElapsed:
                    state[action.payload.lang][action.payload.letter].timeElapsed + action.payload.value,
            };
            return state;
        case LettersActionTypes.RESET:
            const localUserLetters = localStorage.getItem("userLetters")
            const storageState: ILetters = localUserLetters !== null ? JSON.parse(localUserLetters) : lettersConst;
            return storageState
        case LettersActionTypes.SET_LETTERS:
            return action.payload;
        default:
            return state;
    }
};
