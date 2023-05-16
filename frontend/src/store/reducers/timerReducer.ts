export enum TimerActionTypes {
    START_TIMER = "START_TIMER",
    STOP_TIMER = "STOP_TIMER",
    RESET_TIMER = "RESET_TIMER",
    TICK_TIMER = "TICK_TIMER",
}

export interface startTimer {
    type: TimerActionTypes.START_TIMER,
}

export interface stopTimer {
    type: TimerActionTypes.STOP_TIMER,
}

export interface resetTimer {
    type: TimerActionTypes.RESET_TIMER,
    payload: number
}

export interface tickTimer {
    type: TimerActionTypes.TICK_TIMER,
    payload: number
}

interface TimerState {
    time: number,
    timerIsActive: boolean
}

const defaultState: TimerState = {
    time: 0,
    timerIsActive: false
}

export type TimerActions = stopTimer | startTimer | resetTimer | tickTimer

export function countDownReducer(state: TimerState = defaultState, action: TimerActions): TimerState {
    switch (action.type) {
        case TimerActionTypes.RESET_TIMER:
            return defaultState
        case TimerActionTypes.START_TIMER:
            return {
                ...state,
                timerIsActive: true
            }
        case TimerActionTypes.STOP_TIMER:
            return {
                ...state,
                timerIsActive: false
            }
        case TimerActionTypes.TICK_TIMER:
            return {
                ...state,
                time: state.time + 1
            }
        default:
            return state;
    }
}