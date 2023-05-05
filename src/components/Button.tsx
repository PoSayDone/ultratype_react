import React from 'react'

type Props = {}

const Button = (props: Props) => {
    return (
        <button className="button">
            Войти
            <span className="material-symbols-rounded">
                arrow_right_alt
            </span>
        </button>
    )
}

export default Button