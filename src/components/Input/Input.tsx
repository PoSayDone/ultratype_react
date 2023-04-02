import { createContext, forwardRef, useCallback, useContext, useEffect, useRef, useState } from "react";
import Heading from "../Heading/Heading"
import classNames from "classnames";
import Character from "../Character";
import Caret from "../Caret";

// Пропсы для инпута
type InputProps = {
    // Текст вводимый пользователем
    userText: string;
    // Текст задания
    text: string;
    cursorPosition: number;
    currentCharacterRef: React.RefObject<HTMLSpanElement>
}

// Компонент input
const Input = ({ userText, text, cursorPosition , currentCharacterRef }: InputProps) => {
    const userTextArray: string[] = userText.split(/(?<=\s)/)
    const textArray = text.split(/(?<=\s)/)

    const [leftMargin, setLeftMargin] = useState<any | null>(null);
    const [topMargin, setTopMargin] = useState<any | null>(null);
    let previousWordsLength = 0 // Переменная для преобразование индексов двумерного массива в одномерный

    const calculateLeftMargin = useEffect(
        () => {
            currentCharacterRef.current !== undefined ? setLeftMargin(currentCharacterRef.current?.offsetLeft) : 0
            currentCharacterRef.current !== undefined ? setTopMargin(currentCharacterRef.current?.offsetTop) : 0
        },
        [cursorPosition],
    )

    // Возвращаем div'ы слов, состоящие из Character'ов
    return (
        <>
            {
                <Caret leftMargin={leftMargin} topMargin={topMargin}/>
            }
            {
                textArray.map((word, wordIndex) => { // Проходимся по всем словам при помощи map
                    {
                        // Получаем длины предыдущих слов для того, чтобы знать положение указателя в тексте
                        previousWordsLength += wordIndex === 0 ? 0 : textArray[wordIndex - 1].length
                    }
                    return (
                        <div className="input__word">{ // Возвращаем div
                            word.split("").map((character, characterIndex) => { // Проходимся по всем символам в слове при помощи map
                                {
                                    useEffect(() => {
                                        console.log(cursorPosition)
                                        console.log(currentCharacterRef)
                                    }, [cursorPosition, currentCharacterRef])
                                }
                                const isActive = (previousWordsLength + characterIndex === cursorPosition)
                                return (
                                    <>
                                        <Character // Возвращаем символ
                                            ref={isActive ? currentCharacterRef : null}
                                            expected={character} // Эталонное значение
                                            actual={ // Значение пользователя
                                                userTextArray[wordIndex] !== undefined // Если пользователь ввел символ
                                                    ? userTextArray[wordIndex].split("")[characterIndex] // То записываем значение этого символа
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