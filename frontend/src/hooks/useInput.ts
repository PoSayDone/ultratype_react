import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "./useTypedSelector";
import { InputActionTypes } from "../store/reducers/inputReducer";
import {
    LettersActions,
    LettersActionTypes,
} from "../store/reducers/lettersReducer";
import { Dispatch } from "redux";

// Проверяет является ли вводимый символ цифрой, буквой, пробелом или бэкспейсом
const isSymbolAllowed = (code: string, key: string) => {
    return (
        code.startsWith("Key") ||
        code.startsWith("Digit") ||
        code === "Backspace" ||
        code === "Space" ||
        "йцукенгшщзхъэждлорпавыфячсмитьбю".includes(key)
    );
};

const useInput = (enabled: boolean, text: string, mode: string) => {
    const dispatch = useDispatch();
    const letterDispatch: Dispatch<LettersActions> = useDispatch();
    const { cursor, cursorMarginTop, typed } = useTypedSelector((state) => state.input);
    const typedLang = useTypedSelector(state => state.settings.typingLanguage);
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
        (event: KeyboardEvent) => {
            const { key, code, ctrlKey } = event
            if (!enabled || !isSymbolAllowed(code, key)) {
                return;
            }
            if (mode === "learning") {
                if (lastKeyPressTime !== null) {
                    timeSinceLastKeyPress = new Date().getTime() - lastKeyPressTime;
                    setLastKeyPressTime(new Date().getTime());
                }
                setLastKeyPressTime(new Date().getTime());
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
                        if (mode === "learning") {
                            // Костыль, для того, чтобы первая буква в тексте не портила WPM (у нее будет время набора 0 соответственно WPM бесконечный)
                            if (timeSinceLastKeyPress !== 0) {
                                setLetterData(
                                    text.charAt(cursor),
                                    isCorrect,
                                    timeSinceLastKeyPress
                                );
                            }
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
                type: LettersActionTypes.INCREMENT_TYPED_COUNTER,
                payload: { lang: typedLang, letter }
            });
            if (!isCorrect) {
                letterDispatch({
                    type: LettersActionTypes.INCREMENT_ERROR_COUNTER,
                    payload: { lang: typedLang, letter }
                });
            }
            letterDispatch({
                type: LettersActionTypes.ADD_TIME_ELAPSED,
                payload: { lang: typedLang, letter: letter, value: timeDiff }
            });
            letterDispatch({
                type: LettersActionTypes.CALCULATE_ERROR_RATE,
                payload: { lang: typedLang, letter }
            });
            letterDispatch({
                type: LettersActionTypes.CALCULATE_WPM,
                payload: { lang: typedLang, letter }
            });
            letterDispatch({
                type: LettersActionTypes.CALCULATE_CONFIDENCE,
                payload: { lang: typedLang, letter }
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
        cursorMarginTop,
        restartTyping,
        lastKeyPressTime,
    };
};

export default useInput;
