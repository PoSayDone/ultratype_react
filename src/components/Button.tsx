import React from 'react'

type Props = {
    icon: string
    title: string
    onClick?: Function
}

const Button = (props: Props) => {

    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };

    return (
        <button className="button" onClick={event => handleClick()}>
            {props.title}
            <span className="material-symbols-rounded">
                {props.icon}
            </span>
        </button>
    )
}

export default Button