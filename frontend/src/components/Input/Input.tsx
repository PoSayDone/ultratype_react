import { useEffect, useState } from "react";
import Character from "../Character";
import Caret from "../Caret";
import React from "react";

// Пропсы для инпута
type InputProps = {
    // Текст вводимый пользователем
    userText: string;
    // Текст задания
    text: string;
    cursorPosition: number;
    currentCharacterRef: React.RefObject<HTMLSpanElement>
    state: string,
}

// Компонент input
const Input = ({ userText, text, cursorPosition, currentCharacterRef, state }: InputProps) => {
    const userTextArray: string[] = userText.split(" ")
    const textArray = text.split(/(?<=\s)/)

    const [leftMargin, setLeftMargin] = useState<any | null>(null);
    const [topMargin, setTopMargin] = useState<any | null>(null);
    let previousWordsLength = 0 // Переменная для преобразование индексов двумерного массива в одномерный

    const calculateLeftMargin = useEffect(
        () => {
            currentCharacterRef.current !== undefined ? setLeftMargin(currentCharacterRef.current?.offsetLeft) : 0
            currentCharacterRef.current !== undefined ? setTopMargin(currentCharacterRef.current?.offsetTop) : 0
        },
        [cursorPosition]
    )

    // Возвращаем div'ы слов, состоящие из Character'ов
    return (
        <>
            {state !== "finish" && <Caret leftMargin={leftMargin} topMargin={topMargin} />}
            {textArray.map((word, wordIndex) => {
                return (
                    <div className="input__word">
                        <React.Fragment key={wordIndex}>
                            {word.split("").map((character, characterIndex) => {
                                const isActive =
                                    (characterIndex === userTextArray[userTextArray.length - 1]?.length &&
                                        wordIndex === userTextArray.length - 1) 
                                if (isActive)
                                
                                {
                                    console.log(characterIndex, wordIndex, userTextArray.length, cursorPosition, word.length)
                                    console.log(userTextArray[userTextArray.length-1])
                                }

                                return (
                                    <Character
                                        key={`${wordIndex}-${characterIndex}`}
                                        ref={isActive ? currentCharacterRef : null}
                                        expected={character}
                                        actual={userTextArray[wordIndex]?.[characterIndex]}
                                    />
                                );
                            })}
                        </React.Fragment>
                    </div>
                );
            })}
        </>
    );
}

export default Input;