import { useState } from "react";
import Heading from "../Heading/Heading"
import classNames from "classnames";

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

    return (
        <>
            {
                wordsArray.map((word, i) => {
                    return (
                        <div className="input__word">{
                            word.split("").map((character, j) => {
                                return (
                                    <Character 
                                    expected={character} 
                                    actual={typedWords[i] !== undefined ? typedWords[i].split("")[j] : undefined}
                                    />
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