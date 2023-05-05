import React from 'react'

type Props = {
    title: string
    onClick: Function
}

const Button = (props: Props) => {
    return (
        <button className="button" onClick={event => props.onClick()}>
            {props.title}
            <span className="material-symbols-rounded">
                arrow_right_alt
            </span>
        </button>
    )
}

export default Button