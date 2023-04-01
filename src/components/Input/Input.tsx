import { createContext, forwardRef, useContext, useEffect, useRef, useState } from "react";
import Heading from "../Heading/Heading"
import classNames from "classnames";
import Caret from "../Caret";

// Пропсы для инпута
type InputProps = {
    // Текст вводимый пользователем
    userText: string;
    // Текст задания
    text: string;
    cursorPosition: number;
}

// Пропсы для символа
type CharacterProps = {
    // Символ введенный пользователем (может быть undefined, так как пользователь может еще не ввести этот символ)
    actual?: any;
    // Эталонное значение символа
    expected: string;
}

// Компонент символа
const Character = forwardRef((props: CharacterProps, ref) => {

    // Проверяет является ли символ введенная пользователем правильным
    const isCorrect = props.actual === props.expected;
    // Проверяет является ли символ не введенным
    const isNull = props.actual === undefined || props.actual === null;
    // Проверяет является ли символ пробелом
    const isWhitespace = props.expected === " ";

    // Возвращаем span с буквой
    return (
        <span
            className={
            classNames({ // используем модуль classnames для conditional классов
                "letter": props.actual === undefined, // Для символа, который еще не ввел пользователь
                "letter__correct": isCorrect && !isWhitespace, // Для правильного символа
                "letter__incorrect": !isCorrect && !isWhitespace && !isNull, // Для неправильного символа
                'whitespace': isWhitespace,
            })}
            ref = {ref as React.RefObject<HTMLSpanElement>} 
            >{props.expected}</span>
    )
})

// Компонент input
const Input = ({ userText, text, cursorPosition }: InputProps) => {
    const typed = userText // введенные символы
    const words = text // слова задания
    const typedWords: string[] = userText.split(/(?<=\s)/)
    const wordsArray = text.split(/(?<=\s)/)
    const currentIndex = userText.length - 1

    const caretRef = useRef<HTMLSpanElement>(null)
    const currentLetterRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        console.log(currentLetterRef)
    }, [cursorPosition])


    let previousWordsLength = 0 // Переменная для преобразование индексов двумерного массива в одномерный

    // Возвращаем div'ы слов, состоящие из Character'ов
    return (
        <>
            {
                <span
                    ref={caretRef}
                    id="caret"
                    className="caret"
                    style={{
                        left: currentLetterRef.current?.offsetLeft,
                        top:  currentLetterRef.current?.offsetTop
                    }}>
                    |
                </span>
            }
            {
                wordsArray.map((word, currentWordIndex) => { // Проходимся по всем словам при помощи map
                    {
                        // Получаем длины предыдущих слов для того, чтобы знать положение указателя в тексте
                        previousWordsLength += currentWordIndex === 0 ? 0 : wordsArray[currentWordIndex - 1].length
                    }
                    return (
                        <div className="input__word">{ // Возвращаем div
                            word.split("").map((character, currentLetterIndex) => { // Проходимся по всем символам в слове при помощи map
                                const isActive = (previousWordsLength+currentLetterIndex === cursorPosition)
                                return (
                                    <>
                                        <Character // Возвращаем символ
                                            ref={isActive ? currentLetterRef : null}
                                            expected={character} // Эталонное значение
                                            actual={ // Значение пользователя
                                                typedWords[currentWordIndex] !== undefined // Если пользователь ввел символ
                                                    ? typedWords[currentWordIndex].split("")[currentLetterIndex] // То записываем значение этого символа
                                                    : undefined // Иначе пустое значение
                                            }
                                        />
                                    </>
                                )
                            })
                        }
                        </div>
                    )
                })
            }
        </>
    )
}

export default Input;