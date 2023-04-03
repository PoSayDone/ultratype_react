import React, { FC, useRef } from 'react'

type RestartButtonProps = {
    onRestart: () => void;
}

const RestartButton = (props: RestartButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur()
        props.onRestart();
    }

    return (
        <button 
            ref={buttonRef}
            className="restart__button"
            onClick={(e) => {
                e.preventDefault()
                handleClick(e)
            }
            }>
            <span className="material-symbols-rounded">
            refresh
            </span>
            Restart
        </button>
    )
}

export default RestartButton