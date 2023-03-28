import React, { FC, useRef } from 'react'

type RestartButtonProps = {
    onRestart: () => void;
}

const RestartButton = (props: RestartButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        buttonRef.current?.blur();
        props.onRestart();
    }

    return (
        <button 
            ref={buttonRef}
            className="restart__button"
            onClick={props.onRestart}>
            <span className="material-symbols-rounded">
            refresh
            </span>
            Restart
        </button>
    )
}

export default RestartButton