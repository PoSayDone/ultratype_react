import React, { ChangeEvent } from 'react'
import "./AuthInput.scss"

type Props = {
    label: string,
    type: string,
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: ChangeEvent<HTMLInputElement>) => void;
}
const AuthInput = (props: Props) => {


    return (
        <div className="input__container">
            <input
                required
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
            <label>{props.label}</label>
        </div>
    )
}

export default AuthInput