import { MutableRefObject, useRef } from "react";

export enum InputActionTypes {
    SET_CURSOR = "SET_CURSOR",
    SET_TYPED = "SET_TYPED",
    RESTART_TYPING = "RESTART_TYPING",
    SET_CURSOR_MARGIN_LEFT = "SET_CURSOR_MARGIN_LEFT",
    SET_CURSOR_MARGIN_TOP = "SET_CURSOR_MARGIN_TOP",
    SET_CURSOR_SPLIT = "SET_CURSOR_SPLIT",
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

interface CursorMarginLeftAction {
    type: InputActionTypes.SET_CURSOR_MARGIN_LEFT,
    payload: number
}

interface CursorMarginTopAction {
    type: InputActionTypes.SET_CURSOR_MARGIN_TOP,
    payload: number
}

interface CursorSplitAction {
    type: InputActionTypes.SET_CURSOR_SPLIT,
    payload: number
}

interface InputState {
    cursor: number,
    cursorSplitPosition: number,
    cursorMarginLeft: number,
    cursorMarginTop: number,
    typed: string,
}

const defaultState: InputState = {
    cursor: 0,
    cursorSplitPosition: 0,
    cursorMarginLeft: 0,
    cursorMarginTop: 0,
    typed: "",
}

export type InputActions =
    RestartTypingAction
    | CursorAction
    | CursorSplitAction
    | TypedAction
    | CursorMarginLeftAction
    | CursorMarginTopAction

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
        case InputActionTypes.SET_CURSOR_MARGIN_LEFT:
            return {
                ...state,
                cursorMarginLeft: action.payload
            }
        case InputActionTypes.SET_CURSOR_MARGIN_TOP:
            return {
                ...state,
                cursorMarginTop: action.payload
            }
        case InputActionTypes.SET_CURSOR_SPLIT:
            return {
                ...state,
                cursorSplitPosition: action.payload
            }
        default:
            return state
    }
}