import { useDispatch } from "react-redux";

export enum CountdownActionTypes {
    START_COUNTDOWN = "START_COUNTDOWN",
    STOP_COUNTDOWN = "STOP_COUNTDOWN",
    RESET_COUNTDOWN = "RESET_COUNTDOWN",
    TICK_COUNTDOWN = "TICK_COUNTDOWN",
    SET_START_TIME = "SET_START_TIME",
}
export interface startCountdown {
    type: CountdownActionTypes.START_COUNTDOWN,
}

export interface stopCountdown {
    type: CountdownActionTypes.STOP_COUNTDOWN,
}

export interface resetCountdown {
    type: CountdownActionTypes.RESET_COUNTDOWN,
    payload: number
}

export interface tickCountdown {
    type: CountdownActionTypes.TICK_COUNTDOWN,
    payload: number
}

export interface setStartTime {
    type: CountdownActionTypes.SET_START_TIME,
    payload: number
}

interface CountdownState {
    timeLeft: number,
    timerIsActive: boolean
}

const defaultState: CountdownState = {
    timeLeft: 0,
    timerIsActive: false
}

export type CountdownActions = stopCountdown | startCountdown | resetCountdown | tickCountdown | setStartTime

export function countDownReducer(state: CountdownState = defaultState, action: CountdownActions): CountdownState {
    switch (action.type) {
        case CountdownActionTypes.RESET_COUNTDOWN:
            return defaultState
        case CountdownActionTypes.START_COUNTDOWN:
            return {
                ...state,
                timerIsActive: true
            }
        case CountdownActionTypes.STOP_COUNTDOWN:
            return {
                ...state,
                timerIsActive: false
            }
        case CountdownActionTypes.TICK_COUNTDOWN:
            return {
                ...state,
                timeLeft: state.timeLeft - 1
            }
        case CountdownActionTypes.SET_START_TIME:
            return {
                ...state,
                timeLeft: action.payload
            }
        default:
            return state;
    }
}