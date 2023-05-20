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
import {useTypedSelector} from "../../hooks/useTypedSelector";
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
    const userTextArray: string[] = userText.split(" ");
    const textArray = text.split(/(?<=\s)/);
    const dispatch = useDispatch();

    const [leftMargin, setLeftMargin] = useState<any | null>(null);
    const [topMargin, setTopMargin] = useState<any | null>(null);
    let previousWordsLength = 0; // Переменная для преобразование индексов двумерного массива в одномерный


    const typed = useTypedSelector(state=> state.input.invisibleTyped)

    useEffect(() => {
        console.log(typed)

    },[typed])



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

    useEffect(() => {
        if (mode == "infinity") {
            if (topMargin > 0) {
                let newWords = async () => {
                    let res = await WordsService.fetchRandomWords(10)
                    console.log(res.data.strings);
                    dispatch({
                        type: WordsActionTypes.SET_WORDS,
                        payload: text.substring(cursorPosition)+" "+res.data.strings.join(" "), //не работает какого-то хуя
                    })
                }
                newWords()
                dispatch({ type: InputActionTypes.SET_TYPED, payload: "" });
                dispatch({type: InputActionTypes.SET_CURSOR, payload: 0})
            }
        }
    }, [topMargin]);

    // Возвращаем div'ы слов, состоящие из Character'ов
    return (
        <>
            {state !== "finish" && (
                <Caret leftMargin={leftMargin} topMargin={topMargin} />
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
