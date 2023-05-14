import { useCallback, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "./useTypedSelector";
import { InputActionTypes } from "../store/reducers/inputReducer";
import { LetterActions, LetterActionTypes } from "../store/reducers/letterReducer";
import { Dispatch } from "redux";
import useCountdown from "./useCountdown";

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
    const dispatch = useDispatch();
    const letterDispatch: Dispatch<LetterActions> = useDispatch()

    const {
        cursor,
        typed,
        totalTyped,
        accuracy,
    } = useTypedSelector((state) => state.input);

    const { timeLeft } = useCountdown()

    const currentIndex = typed.split(" ").length - 1;

    const keydownHandler = useCallback(
        ({ key, code, ctrlKey }: KeyboardEvent) => {
            if (!enabled || !isSymbolAllowed(code)) {
                return;
            }

            switch (key) {
                case "Backspace":
                    if (ctrlKey && typed[typed.length - 1] === " ") {
                        dispatch({
                            type: InputActionTypes.SET_TYPED,
                            payload: typed.slice(0, -1),
                        });
                    } else if (ctrlKey) {
                        const lastIndex = typed.lastIndexOf(" ") + 1;
                        const before = typed.slice(0, lastIndex);
                        dispatch({
                            type: InputActionTypes.SET_TYPED,
                            payload: before,
                        });
                        dispatch({
                            type: InputActionTypes.SET_CURSOR,
                            payload: lastIndex,
                        });
                        break;
                    }
                    dispatch({
                        type: InputActionTypes.SET_TYPED,
                        payload: typed.slice(0, -1),
                    });
                    if (cursor > 0) {
                        dispatch({
                            type: InputActionTypes.SET_CURSOR,
                            payload: cursor - 1,
                        });
                    }
                    break;
                case " ":
                    if (typed[typed.length - 1] === " " || text[cursor] !== " ") {
                        return;
                    } else {
                        dispatch({
                            type: InputActionTypes.SET_TYPED,
                            payload: typed.concat(key),
                        });
                        dispatch({
                            type: InputActionTypes.SET_CURSOR,
                            payload: cursor + 1,
                        });
                    }
                    break;
                default:
                    if (
                        text.split(" ")[currentIndex].length <=
                        typed.split(" ")[currentIndex].length &&
                        typed[typed.length - 1]
                    ) {
                        return;
                    } else {
                        const isCorrect = text.charAt(cursor) === key;
                        setLetterData(key, isCorrect);
                        dispatch({
                            type: InputActionTypes.SET_TYPED,
                            payload: typed.concat(key),
                        });
                        dispatch({
                            type: InputActionTypes.SET_CURSOR,
                            payload: cursor + 1,
                        });
                    }
                    break;
            }
        },
        [cursor, enabled, text, typed, dispatch]
    );

    const setLetterData = useCallback(
        (letter: string, isCorrect = true) => {
            letterDispatch({
                type: LetterActionTypes.INCREMENT_TYPED_COUNTER,
                payload: { letter },
            });
            if (!isCorrect) {
                letterDispatch({
                    type: LetterActionTypes.INCREMENT_ERROR_COUNTER,
                    payload: { letter },
                });
            }
        },
        []
    );

    // Добавляет и убирает eventListner'ы
    useEffect(() => {
        window.addEventListener("keydown", keydownHandler);
        return () => {
            window.removeEventListener("keydown", keydownHandler);
        };
    }, [keydownHandler]);

    // Ф-ия для перезапуска печати
    const restartTyping = useCallback(() => {
        dispatch({ type: InputActionTypes.RESTART_TYPING });
        dispatch({ type: InputActionTypes.SET_TOTAL_TYPED, payload: 0 });
    }, [dispatch]);

    return {
        typed,
        cursor,
        totalTyped,
        restartTyping,
        accuracy,
    };
};

export default useInput;