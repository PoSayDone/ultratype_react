import {useDispatch} from "react-redux";

export let COUNTDOWN_SECONDS = 120;
export enum CountDownActionTypes{
	SET_TIMER_ISACTIVE = "SET_TIMER_ISACTIVE",
	SET_DEFAULT_STATE = "SET_DEFAULT_STATE",
	SET_TIMELEFT = "SET_TIMELEFT"
}

interface SetTimerIsActiveAction {
	type : CountDownActionTypes.SET_TIMER_ISACTIVE,
	payload: boolean
}

interface SetDefaultStateAction{
	type: CountDownActionTypes.SET_DEFAULT_STATE,
	payload: {
		timeLeft: number,
		timerIsActive: boolean
	}
}

interface SetTimeLeftAction{
	type: CountDownActionTypes.SET_TIMELEFT,
	payload: number
}

interface CountDownState{
	timeLeft: number,
	timerIsActive: boolean
}

const defaultState: CountDownState = {
	timeLeft: COUNTDOWN_SECONDS,
	timerIsActive: false
}

export type CountDownActions = SetDefaultStateAction | SetTimeLeftAction | SetTimerIsActiveAction

export function countDownReducer(state : CountDownState = defaultState, action : CountDownActions) : CountDownState{
	switch (action.type) {
		case CountDownActionTypes.SET_TIMER_ISACTIVE:
			return {...state,timerIsActive: action.payload}
		case CountDownActionTypes.SET_DEFAULT_STATE:
			return{
				timerIsActive: action.payload.timerIsActive,
				timeLeft: action.payload.timeLeft
			}
		case CountDownActionTypes.SET_TIMELEFT:
			return {
				...state,
				timeLeft: action.payload
			}
		default:
			return state
	}
}