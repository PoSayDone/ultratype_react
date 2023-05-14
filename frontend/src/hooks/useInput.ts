import { useCallback, useContext, useEffect, useRef, useState } from "react";
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
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const { cursor, typed, totalTyped, accuracy } = useTypedSelector((state) => state.input);
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
                    setStartTime(new Date());
                    setEndTime(null);
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
                        let timeDiff = 0;
                        if (startTime !== null) {
                            timeDiff = endTime ? endTime.getTime() - startTime?.getTime()! : 0;
                            setLetterData(key, isCorrect, timeDiff);
                        }
                        dispatch({
                            type: InputActionTypes.SET_TYPED,
                            payload: typed.concat(key),
                        });
                        dispatch({
                            type: InputActionTypes.SET_CURSOR,
                            payload: cursor + 1,
                        });
                        setStartTime(new Date());
                        setEndTime(null);
                    }
                    break;
            }
        },
        [cursor, enabled, text, typed, dispatch, startTime, endTime]
    );

    const setLetterData = useCallback(
        (letter: string, isCorrect = true, timeDiff: number) => {
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
            letterDispatch({
                type: LetterActionTypes.ADD_TIME_ELAPSED,
                payload: { letter, value: timeDiff }
            });
            letterDispatch({
                type: LetterActionTypes.CALCULATE_ERROR_RATE,
                payload: { letter }
            });
            letterDispatch({
                type: LetterActionTypes.CALCULATE_WPM,
                payload: { letter: letter }
            });
            letterDispatch({
                type: LetterActionTypes.CALCULATE_CONFIDENCE,
                payload: { letter }
            });
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

    // Обновляет endTime при отпускании клавиши
    useEffect(() => {
        const keyupHandler = () => {
            setEndTime(new Date());
        };
        window.addEventListener("keyup", keyupHandler);
        return () => {
            window.removeEventListener("keyup", keyupHandler);
        };
    }, []);

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