import React from 'react'
import Caret from './Caret';
import classNames from 'classnames';

type UserTypingsProps = {
    userInput: string;
    words: string;
}

type CharacterProps = {
    actual: string;
    expected: string;
}

const Character = (props: CharacterProps) => {
    const isCorrect = props.actual === props.expected;
    const isWhitespace = props.expected === " ";

    return (
        <span className={classNames({
            "letter__correct": isCorrect && !isWhitespace,
            "letter__incorrect": !isCorrect && !isWhitespace,
            "whitespace__incorrect": !isCorrect && isWhitespace,
        })}>{props.expected}</span>
    )
}

const UserTypings = (props: UserTypingsProps) => {
    const typedCharacters = props.userInput.split("");

  return (
    <div className="user__typings">
        {typedCharacters.map((char, index) => {
            return (
                <>
                    <Character
                        key={`${char}_${index}`}
                        actual={char}
                        expected={props.words[index]}
                    />
                </>
            )
        })}
        <Caret/>
    </div>
  )
}

export default UserTypings