import { createContext, useContext, useState } from "react";
import Heading from "../Heading/Heading"
import classNames from "classnames";
import Caret from "../Caret";

type InputProps = {
    userText: string;
    text: string;
}

type CharacterProps = {
    actual?: any;
    expected: string;
}

const Character = (props: CharacterProps) => {

    const isCorrect = props.actual === props.expected;
    const isNull = props.actual === undefined || props.actual === null;
    const isWhitespace = props.expected === " ";

    return (
        <span className={
            classNames({
                "letter": props.actual === undefined,
                "letter__correct": isCorrect && !isWhitespace,
                "letter__incorrect": !isCorrect && !isWhitespace && !isNull,
                "whitespace__incorrect": !isCorrect && isWhitespace,
            })}>{props.expected}</span>
    )
}

const Input = (props: InputProps) => {
    const typedWords = props.userText.split(" ");
    const wordsArray = props.text.split(" ")
    let previousWordsLength = 0

    return (
        <>
            {
                wordsArray.map((word, currentWordIndex) => {
                    {
                        previousWordsLength += currentWordIndex === 0 ? 0 : wordsArray[currentWordIndex - 1].length
                    }
                    return (
                        <div className="input__word">{
                            word.split("").map((character, currentLetterIndex) => {
                                return (
                                    <>
                                        <Character
                                            expected={character}
                                            actual={
                                                typedWords[currentWordIndex] !== undefined
                                                    ? typedWords[currentWordIndex].split("")[currentLetterIndex]
                                                    : undefined
                                            }
                                        />
                                        {
                                            (previousWordsLength + currentLetterIndex) === props.userText.split(" ").join("").length - 1
                                                ? <Caret />
                                                : ""
                                        }
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