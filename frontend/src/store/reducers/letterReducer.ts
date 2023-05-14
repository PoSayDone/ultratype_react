import { ILetter } from "../../models/ILetter"

const calculateConfidence = (errorRate: number, wpm: number) => {
    const errorFactor = (1 - errorRate)
    const averageWpm = 60
    const wpmFactor = (wpm * 100 / averageWpm) / 100
    return errorFactor * wpmFactor
}

const defaultState: ILetter = {
    "e": { wpm: 0, errorRate: 0, confidence: 0, typedCounter: 0, errorCounter: 0, timeElapsed: 0 },
    "n": { wpm: 0, errorRate: 0, confidence: 0, typedCounter: 0, errorCounter: 0, timeElapsed: 0 },
    "i": { wpm: 0, errorRate: 0, confidence: 0, typedCounter: 0, errorCounter: 0, timeElapsed: 0 },
    "t": { wpm: 0, errorRate: 0, confidence: 0, typedCounter: 0, errorCounter: 0, timeElapsed: 0 },
    "r": { wpm: 0, errorRate: 0, confidence: 0, typedCounter: 0, errorCounter: 0, timeElapsed: 0 },
    "l": { wpm: 0, errorRate: 0, confidence: 0, typedCounter: 0, errorCounter: 0, timeElapsed: 0 }
}

export enum LetterActionTypes {
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
    ADD_TIME_ELAPSED = "ADD_TIME_ELAPSED"
}

interface SetWPMAction {
    type: LetterActionTypes.SET_WPM,
    payload: {
        letter: string,
        value: number
    }
}

interface SetErrorRateAction {
    type: LetterActionTypes.SET_ERROR_RATE,
    payload: {
        letter: string,
        value: number
    }
}

interface SetConfidence {
    type: LetterActionTypes.SET_CONFIDENCE,
    payload: {
        letter: string,
        value: number
    }
}

interface AddLetter {
    type: LetterActionTypes.ADD_LETTER,
    payload: {
        letter: string
    }
}

interface IncrementTypedCounter {
    type: LetterActionTypes.INCREMENT_TYPED_COUNTER,
    payload: {
        letter: string
    }
}

interface IncrementErrorCounter {
    type: LetterActionTypes.INCREMENT_ERROR_COUNTER
    payload: {
        letter: string
    }
}

interface CalculateErrorRate {
    type: LetterActionTypes.CALCULATE_ERROR_RATE
    payload: {
        letter: string
    }
}
interface CalculateConfidence {
    type: LetterActionTypes.CALCULATE_CONFIDENCE
    payload: {
        letter: string
    }
}

interface CalculateWpm {
    type: LetterActionTypes.CALCULATE_WPM
    payload: {
        letter: string
    }
}

interface SetTimeElapsed {
    type: LetterActionTypes.SET_TIME_ELAPSED
    payload: {
        letter: string
        value: number
    }
}

interface AddTimeElapsed {
    type: LetterActionTypes.ADD_TIME_ELAPSED
    payload: {
        letter: string
        value: number
    }
}

export type LetterActions = SetWPMAction | SetErrorRateAction | SetConfidence | AddLetter | IncrementErrorCounter | IncrementTypedCounter | CalculateErrorRate | CalculateConfidence | SetTimeElapsed | AddTimeElapsed | CalculateWpm

export const letterReducer = (state = defaultState, action: LetterActions) => {
    switch (action.type) {
        case LetterActionTypes.SET_WPM:
            state[action.payload.letter] = {
                ...state[action.payload.letter],
                wpm: action.payload.value
            }
            return state
        case LetterActionTypes.SET_ERROR_RATE:
            state[action.payload.letter] = {
                ...state[action.payload.letter],
                errorRate: action.payload.value
            }
        case LetterActionTypes.SET_CONFIDENCE:
            state[action.payload.letter] = {
                ...state[action.payload.letter],
                confidence: action.payload.value
            }
        case LetterActionTypes.ADD_LETTER:
            state[action.payload.letter] = {
                wpm: 0,
                errorRate: 0,
                confidence: 0,
                typedCounter: 0,
                errorCounter: 0,
                timeElapsed: 0
            }
        case LetterActionTypes.INCREMENT_TYPED_COUNTER:
            state[action.payload.letter] = {
                ...state[action.payload.letter],
                typedCounter: state[action.payload.letter].typedCounter + 1
            }
            return state
        case LetterActionTypes.INCREMENT_ERROR_COUNTER:
            state[action.payload.letter] = {
                ...state[action.payload.letter],
                errorCounter: state[action.payload.letter].errorCounter + 1
            }
            return state
        case LetterActionTypes.CALCULATE_ERROR_RATE:
            state[action.payload.letter] = {
                ...state[action.payload.letter],
                errorRate: state[action.payload.letter].errorCounter / state[action.payload.letter].typedCounter
            }
            return state
        case LetterActionTypes.CALCULATE_WPM:
            state[action.payload.letter] = {
                ...state[action.payload.letter],
                wpm:
                    (state[action.payload.letter].typedCounter / 5) / (state[action.payload.letter].timeElapsed / 60000)
            }
            return state
        case LetterActionTypes.CALCULATE_CONFIDENCE:
            state[action.payload.letter] = {
                ...state[action.payload.letter],
                confidence:
                    calculateConfidence(state[action.payload.letter].errorRate, state[action.payload.letter].wpm)
            }
            return state
        case LetterActionTypes.SET_TIME_ELAPSED:
            state[action.payload.letter] = {
                ...state[action.payload.letter],
                timeElapsed:
                    action.payload.value
            }
            return state
        case LetterActionTypes.ADD_TIME_ELAPSED:
            state[action.payload.letter] = {
                ...state[action.payload.letter],
                timeElapsed:
                    state[action.payload.letter].timeElapsed +
                    action.payload.value
            }
            return state
        default:
            return state
    }
}