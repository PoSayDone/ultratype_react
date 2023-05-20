import { MutableRefObject, useRef } from "react";

export enum InputActionTypes {
    SET_CURSOR = "SET_CURSOR",
    SET_TYPED = "SET_TYPED",
    RESTART_TYPING = "RESTART_TYPING",
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

interface InputState {
    cursor: number,
    typed: string,
}

const defaultState: InputState = {
    cursor: 0,
    typed: "",
}

export type InputActions =
    RestartTypingAction
    | CursorAction
    | TypedAction

export const inputReducer = (state: InputState = defaultState, action: InputActions): InputState => {
    switch (action.type) {
        case InputActionTypes.RESTART_TYPING:
            return defaultState
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
        default:
            return state
    }
}