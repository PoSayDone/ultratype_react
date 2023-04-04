import {MutableRefObject, useRef} from "react";

export enum InputActionTypes {
	MAX_TYPED = "MAX_TYPED",
	SET_CURSOR = "SET_CURSOR",
	SET_TOTAL_CORRECT_TYPED_NUMBER = "SET_TOTAL_CORRECT_TYPED_NUMBER",
	SET_TOTAL_TYPED_NUMBER = "SET_TOTAL_TYPED_NUMBER",
	SET_TYPED = "SET_TYPED",
	RESTART_TYPING = "RESTART_TYPING",
	SET_TOTAL_TYPED = "SET_TOTAL_TYPED"
}

interface SetTotalTypedAction {
	type: InputActionTypes.SET_TOTAL_TYPED,
	payload: number,
}


interface CorrectAction {
	type: InputActionTypes.SET_TOTAL_CORRECT_TYPED_NUMBER,
	payload: number
}


interface TypedAction {
	type: InputActionTypes.SET_TYPED,
	payload: string
}

interface RestartTypingAction {
	type: InputActionTypes.RESTART_TYPING
}

interface CursorAction {
	type: InputActionTypes.SET_CURSOR,
	payload: number
}

interface MaxTypedAction {
	type: InputActionTypes.MAX_TYPED,
	payload: number
}

interface TypedNumberAction {
	type: InputActionTypes.SET_TOTAL_TYPED_NUMBER,
	payload: number
}

interface InputState {
	cursor: number,
	typed: string,
	totalTypedNumber: number
	totalCorrectTypedNumber: number,
	totalTyped: number,
	accuracy: number
	maxTyped: number
}

const defaultState: InputState = {
	cursor: 0,
	typed: "",
	totalTyped: 0,
	totalCorrectTypedNumber: 0,
	totalTypedNumber: 0,
	accuracy: 100,
	maxTyped: 0,
}

export  type InputActions =
	RestartTypingAction
	| MaxTypedAction
	| TypedNumberAction
	| CursorAction
	| TypedAction
	| CorrectAction
	| SetTotalTypedAction

export const inputReducer = (state: InputState = defaultState, action: InputActions): InputState => {
	switch (action.type) {
		case InputActionTypes.RESTART_TYPING:
			return defaultState
		case InputActionTypes.MAX_TYPED:
			return {
				...state,
				maxTyped: action.payload,
				// accuracy: isNaN(Math.round((state.totalCorrectTypedNumber / state.totalTypedNumber) * 100)) ? 100 : Math.round((state.totalCorrectTypedNumber / state.totalTypedNumber) * 100)
			}
		case InputActionTypes.SET_TOTAL_TYPED_NUMBER:
			return {
				...state,
				totalTypedNumber: action.payload
			}
		case InputActionTypes.SET_CURSOR:
			return {
				...state,
				cursor: action.payload
			}
		case InputActionTypes.SET_TYPED:
			return {
				...state,
				typed: action.payload
			}
		case InputActionTypes.SET_TOTAL_CORRECT_TYPED_NUMBER:
			return {
				...state,
				totalCorrectTypedNumber: action.payload
			}
		case InputActionTypes.SET_TOTAL_TYPED:
			return {
				...state,
				totalTyped: action.payload
			}

		default:
			return state
	}
}