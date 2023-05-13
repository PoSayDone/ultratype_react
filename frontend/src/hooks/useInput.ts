import { Dispatch, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "./useTypedSelector";
import { InputActions, InputActionTypes } from "../store/reducers/inputReducer";

export { InputActionTypes } from './../store/reducers/inputReducer'
// Проверяет является ли вводимый символ цифрой, буквой, пробелом или бэкспейсом

const isSymbolAllowed = (code: string) => {
    return (
        code.startsWith("Key") ||
        code.startsWith("Digit") ||
        code === "Backspace" ||
        code === "Space"
    );
};

const useInput = (enabled: boolean, text: string) => {
    const dispatch: Dispatch<InputActions> = useDispatch()
    const {
        cursor,
        typed,
        totalTypedNumber,
        totalCorrectTypedNumber,
        totalTyped,
        accuracy,
        maxTyped,
    } = useTypedSelector(state => state.input)
    const currentIndex = typed.split(" ").length - 1
    const keydownHandler = useCallback(
        ({ key, code, ctrlKey }: KeyboardEvent) => {
            if (!enabled || !isSymbolAllowed(code)) {
                return;
            }

            switch (key) {
                case "Backspace":
                    if (ctrlKey && typed[typed.length - 1] === " ") {
                        dispatch({ type: InputActionTypes.SET_TYPED, payload: typed.slice(0, -1) })
                    }
                    else if (ctrlKey) {
                        console.log(typed[typed.length - 1] === " ")
                        const lastIndex = typed.lastIndexOf(" ") + 1;
                        const before = typed.slice(0, lastIndex);
                        dispatch({ type: InputActionTypes.SET_TYPED, payload: before })
                        dispatch({ type: InputActionTypes.SET_CURSOR, payload: lastIndex })
                        break;
                    }
                    dispatch({ type: InputActionTypes.SET_TYPED, payload: typed.slice(0, -1) })
                    if (cursor > 0) {
                        dispatch({ type: InputActionTypes.SET_CURSOR, payload: cursor - 1 })
                        dispatch({ type: InputActionTypes.MAX_TYPED, payload: Math.max(cursor, maxTyped) })
                    }
                    if (totalTyped > 0) {
                        dispatch({ type: InputActionTypes.SET_TOTAL_TYPED, payload: totalTyped - 1 })
                    }
                    break;
                case " ":
                    if (typed[typed.length - 1] === " " || text[cursor] != ' ') {
                        return
                    } else {
                        dispatch({ type: InputActionTypes.SET_TYPED, payload: typed.concat(key) })
                        dispatch({ type: InputActionTypes.SET_CURSOR, payload: cursor + 1 })
                        dispatch({ type: InputActionTypes.MAX_TYPED, payload: Math.max(cursor, maxTyped) })
                        dispatch({ type: InputActionTypes.SET_TOTAL_TYPED, payload: totalTyped + 1 })
                    }
                    break
                default:
                    if (text.split(" ")[currentIndex].length <= typed.split(" ")[currentIndex].length && typed[typed.length - 1]) {
                        return
                    } else {
                        dispatch({ type: InputActionTypes.SET_TYPED, payload: typed.concat(key) })
                        dispatch({ type: InputActionTypes.SET_CURSOR, payload: cursor + 1 })
                        dispatch({ type: InputActionTypes.MAX_TYPED, payload: Math.max(cursor, maxTyped) })
                        dispatch({ type: InputActionTypes.SET_TOTAL_TYPED, payload: totalTyped + 1 })
                    }
                    break;
            }
        },
        [cursor, enabled]
    );

    const clearTyped = useCallback(() => {
        dispatch({ type: InputActionTypes.SET_TYPED, payload: "" })
        dispatch({ type: InputActionTypes.SET_CURSOR, payload: 0 })
        dispatch({ type: InputActionTypes.MAX_TYPED, payload: 0 })
    }, [])


    // функция установки точности
    function setTypedNumber(typed: number, correctTyped: number) {
        dispatch({ type: InputActionTypes.SET_TOTAL_TYPED_NUMBER, payload: totalTypedNumber + typed })
        dispatch({
            type: InputActionTypes.SET_TOTAL_CORRECT_TYPED_NUMBER,
            payload: totalCorrectTypedNumber + correctTyped
        })
    }

    // рестарт точности
    const restartAccuracy = () => dispatch({ type: InputActionTypes.RESTART_TYPING })

    // Сбрасывает количество введенных символов
    const resetTotalTyped = useCallback(() => {
        dispatch({ type: InputActionTypes.SET_TOTAL_TYPED, payload: 0 })
    }, [])

    // Добавляет и убирает eventListner'ы
    useEffect(() => {
        window.addEventListener("keydown", keydownHandler)
        return () => {
            window.removeEventListener("keydown", keydownHandler)
        }
    }, [keydownHandler])


    const restartTyping = () => {
        dispatch({ type: InputActionTypes.SET_TOTAL_TYPED, payload: 0 })
        restartAccuracy()
    }

    return {
        typed,
        cursor,
        clearTyped,
        resetTotalTyped,
        totalTyped,
        restartTyping,
        accuracy,
        setTypedNumber,
        maxTyped,
    }
}

export default useInput