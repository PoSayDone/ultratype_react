import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "./useTypedSelector";
import { InputActionTypes } from "../store/reducers/inputReducer";
import {
    LetterActions,
    LetterActionTypes,
} from "../store/reducers/letterReducer";
import { Dispatch } from "redux";
import useCountdown from "./useCountdown";
import { init } from "i18next";

// Проверяет является ли вводимый символ цифрой, буквой, пробелом или бэкспейсом
const isSymbolAllowed = (code: string,key:string) => {
    return (
        code.startsWith("Key") ||
        code.startsWith("Digit") ||
        code === "Backspace" ||
        code === "Space" ||
        "йцукенгшщзхъэждлорпавыфячсмитьбю".includes(key)
    );
};

const useInput = (enabled: boolean, text: string) => {
    const dispatch = useDispatch();
    const letterDispatch: Dispatch<LetterActions> = useDispatch();
    const { cursor, typed } = useTypedSelector((state) => state.input);
    const currentIndex = typed.split(" ").length - 1;
    const [lastKeyPressTime, setLastKeyPressTime] = useState<number | null>(
        null
    );
    let timeSinceLastKeyPress = 0;

    // Ф-ия для перезапуска печати
    const restartTyping = () => {
        setLastKeyPressTime(null);
        timeSinceLastKeyPress = 0;
        dispatch({ type: InputActionTypes.RESTART_TYPING });
    };

    const keydownHandler = useCallback(
        ({ key, code, ctrlKey }: KeyboardEvent) => {
            console.log(key);
            if (!enabled || !isSymbolAllowed(code,key)) {
                return;
            }
            if (lastKeyPressTime !== null) {
                timeSinceLastKeyPress = new Date().getTime() - lastKeyPressTime;
                setLastKeyPressTime(new Date().getTime());
            }
            setLastKeyPressTime(new Date().getTime());
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
                    event.preventDefault();
                    if (
                        typed[typed.length - 1] === " " ||
                        text[cursor] !== " "
                    ) {
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
                        dispatch({
                            type: InputActionTypes.SET_TYPED,
                            payload: typed.concat(key),
                        });
                        dispatch({
                            type: InputActionTypes.SET_CURSOR,
                            payload: cursor + 1,
                        });
                        const isCorrect = text.charAt(cursor) === key;
                        // Костыль, для того, чтобы первая буква в тексте не портила WPM (у нее будет время набора 0 соответственно WPM бесконечный)
                        if (timeSinceLastKeyPress !== 0) {
                            setLetterData(
                                text.charAt(cursor),
                                isCorrect,
                                timeSinceLastKeyPress
                            );
                        }
                    }
                    break;
            }
        },
        [cursor, enabled, text, typed, dispatch, lastKeyPressTime]
    );

    const setLetterData = useCallback(
        (letter: string, isCorrect = true, timeDiff: number) => {
            letterDispatch({
                type: LetterActionTypes.INCREMENT_TYPED_COUNTER,
                payload: {letter}
            });
            if (!isCorrect) {
                letterDispatch({
                    type: LetterActionTypes.INCREMENT_ERROR_COUNTER,
                    payload: { letter },
                });
            }
            letterDispatch({
                type: LetterActionTypes.ADD_TIME_ELAPSED,
                payload: { letter, value: timeDiff },
            });
            letterDispatch({
                type: LetterActionTypes.CALCULATE_ERROR_RATE,
                payload: { letter },
            });
            letterDispatch({
                type: LetterActionTypes.CALCULATE_WPM,
                payload: { letter: letter },
            });
            letterDispatch({
                type: LetterActionTypes.CALCULATE_CONFIDENCE,
                payload: { letter },
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

    return {
        typed,
        cursor,
        restartTyping,
        lastKeyPressTime,
    };
};

export default useInput;
