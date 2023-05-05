import React from 'react'

type Props = {
    title: string
}

const Button = (props: Props) => {
    return (
        <button className="button">
            {props.title}
            <span className="material-symbols-rounded">
                arrow_right_alt
            </span>
        </button>
    )
}

export default Button