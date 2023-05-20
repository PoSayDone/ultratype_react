import { useEffect, useRef, useState } from "react";
import Character from "../Character";
import Caret from "../Caret";
import React from "react";
import AnimatedDiv from "../AnimatedDiv";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { WordsActionTypes } from "../../store/reducers/wordsReducer";
import { InputActionTypes } from "../../store/reducers/inputReducer";
import WordsService from "../../services/WordsService";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import useEngine from "../../hooks/useEngine";

// Пропсы для инпута
type InputProps = {
    // Текст вводимый пользователем
    userText: string;
    // Текст задания
    text: string;
    cursorPosition: number;
    currentCharacterRef: React.RefObject<HTMLSpanElement>;
    state: string;
};

// Компонент input
const Input = ({
    userText,
    text,
    cursorPosition,
    currentCharacterRef,
    state,
}: InputProps) => {
    const dispatch = useDispatch();

    const [leftMargin, setLeftMargin] = useState<any | null>(null);
    const [topMargin, setTopMargin] = useState<any | null>(null);
    let previousWordsLength = 0; // Переменная для преобразование индексов двумерного массива в одномерный

    const calculateLeftMargin = useEffect(() => {
        currentCharacterRef.current !== undefined
            ? setLeftMargin(currentCharacterRef.current?.offsetLeft)
            : 0;
        currentCharacterRef.current !== undefined
            ? setTopMargin(currentCharacterRef.current?.offsetTop)
            : 0;
    }, [cursorPosition]);

    const mode = useParams().mode || "learning";
    const inputWordRef = useRef();

    const [cursorSplitPosition, setCursorSplitPosition] = useState(0);

    const visibleText = text.substring(cursorSplitPosition);
    const visibleUserText = userText.substring(cursorSplitPosition);

    const textArray = visibleText.split(/(?<=\s)/);
    const userTextArray: string[] = visibleUserText.split(" ");

    useEffect(() => {
        let newWords = async () => {
            let res = await WordsService.fetchRandomWords(10);
            console.log(res.data.strings);
            dispatch({
                type: WordsActionTypes.SET_WORDS,
                payload: text + res.data.strings.join(" "),
            });
        };
        if (topMargin > 0) {
            setCursorSplitPosition(cursorPosition);
        }
        if (mode === "infinity" || mode === "timeattack") {
            newWords();
        }
    }, [topMargin]);

    useEffect(() => {
        if (mode === "learning" && userText == "") {
            // newWords();
            setCursorSplitPosition(0);
        }
    }, [userText]);

    // Возвращаем div'ы слов, состоящие из Character'ов
    return (
        <>
            {state !== "finish" && (
                <Caret leftMargin={leftMargin} topMargin={0} />
            )}
            {textArray.map((word, wordIndex) => {
                return (
                    <AnimatedDiv className="input__word" ref={inputWordRef}>
                        <React.Fragment key={wordIndex}>
                            {word.split("").map((character, characterIndex) => {
                                const isActive =
                                    characterIndex ===
                                        userTextArray[userTextArray.length - 1]
                                            ?.length &&
                                    wordIndex === userTextArray.length - 1;
                                return (
                                    <Character
                                        key={`${wordIndex}-${characterIndex}`}
                                        ref={
                                            isActive
                                                ? currentCharacterRef
                                                : null
                                        }
                                        expected={character}
                                        actual={
                                            userTextArray[wordIndex]?.[
                                                characterIndex
                                            ]
                                        }
                                    />
                                );
                            })}
                        </React.Fragment>
                    </AnimatedDiv>
                );
            })}
        </>
    );
};

export default Input;
