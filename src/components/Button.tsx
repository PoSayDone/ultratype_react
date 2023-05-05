import React from 'react'

type Props = {
    text: string
    icon: string
}

const Button = (props: Props) => {
    return (
        <button className="button">
            {props.text}
            <span className="material-symbols-rounded">
                {props.icon}
            </span>
        </button>
    )
}

export default Button