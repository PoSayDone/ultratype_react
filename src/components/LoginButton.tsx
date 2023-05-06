import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type Props = {
    icon: string
    title: string
    onClick?: Function
}

const LoginButton = (props: Props) => {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };

    return (
        <button type='submit' className="button" onClick={event => handleClick()}>
            {props.title}
            <span className="material-symbols-rounded">
                {props.icon}
            </span>
        </button>
    )
}

export default LoginButton