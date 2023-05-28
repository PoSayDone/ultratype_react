import { useEffect, useRef, useState } from "react";
import Character from "../Character";
import Caret from "../Caret";
import React from "react";
import { useDispatch } from "react-redux";
import { InputActionTypes } from "../../store/reducers/inputReducer";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import AnimatedDiv from "../AnimatedDiv";

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

    const { cursorMarginLeft, cursorSplitPosition } = useTypedSelector(state => state.input)

    useEffect(() => {
        currentCharacterRef.current !== undefined
            ? dispatch({ type: InputActionTypes.SET_CURSOR_MARGIN_LEFT, payload: currentCharacterRef.current?.offsetLeft })
            : 0;
        currentCharacterRef.current !== undefined
            ? dispatch({ type: InputActionTypes.SET_CURSOR_MARGIN_TOP, payload: currentCharacterRef.current?.offsetTop })
            : 0;
    }, [cursorPosition]);

    const inputWordRef = useRef();

    const visibleText = text.substring(cursorSplitPosition);
    const visibleUserText = userText.substring(cursorSplitPosition);

    const textArray = visibleText.split(/(?<=\s)/);
    const userTextArray: string[] = visibleUserText.split(" ");

    // Возвращаем div'ы слов, состоящие из Character'ов
    return (
        <>
            {state !== "finish" && (
                <Caret leftMargin={cursorMarginLeft} topMargin={0} />
            )}
            {textArray.map((word, wordIndex) => {
                return (
                    <AnimatedDiv className="input__word">
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
