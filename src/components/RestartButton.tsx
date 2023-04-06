import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next';

type RestartButtonProps = {
    onRestart: () => void;
}

const RestartButton = (props: RestartButtonProps) => {
    const {t, i18n} = useTranslation()
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur()
        props.onRestart();
    }

    return (
        <button 
            ref={buttonRef}
            className="button restart__button"
            onClick={(e) => {
                e.preventDefault()
                handleClick(e)
            }
            }>
            <span className="material-symbols-rounded">
            refresh
            </span>
            {t("typing.restartButton")}
        </button>
    )
}

export default RestartButton