import React from 'react'

type Props = {
    icon: string
    title: string
    onClick: Function
}

const Button = (props: Props) => {
    return (
        <button className="button" onClick={event => props.onClick()}>
            {props.title}
            <span className="material-symbols-rounded">
                {props.icon}
            </span>
        </button>
    )
}

export default Button