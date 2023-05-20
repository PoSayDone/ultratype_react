import { MutableRefObject, useRef } from "react";

export enum InputActionTypes {
    SET_CURSOR = "SET_CURSOR",
    SET_TYPED = "SET_TYPED",
    RESTART_TYPING = "RESTART_TYPING",
    SET_INVISIBLE_TYPED = "SET_INVISIBLE_TYPED"
}

interface TypedAction {
    type: InputActionTypes.SET_TYPED,
    payload: string
}

interface InvisibleTypedAction{
    type: InputActionTypes.SET_INVISIBLE_TYPED
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
    invisibleTyped: string
}

const defaultState: InputState = {
    cursor: 0,
    typed: "",
    invisibleTyped: ""
}

export type InputActions =
    RestartTypingAction
    | CursorAction
    | TypedAction
    | InvisibleTypedAction

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
            return action.payload == "" ?{
                ...state,
                typed: action.payload
            } : {
                ...state,
                typed:action.payload,
                invisibleTyped: action.payload
            }
            case InputActionTypes.SET_INVISIBLE_TYPED:
                return {
                    ...state,
                    invisibleTyped: action.payload
                }
        default:
            return state
    }
}