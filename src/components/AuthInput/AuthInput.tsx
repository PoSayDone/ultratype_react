import React from 'react'
import "./AuthInput.scss"

type Props = {
    label: string,
    type: string,
    value?: string,
    onChange?: (event: any) => void
}
const AuthInput = (props: Props) => {

    const handleChange = () => {
        if (props.onChange) {
            return props.onChange;
        }
    }

    const handleValue = () => {
        if (props.value) {
            return props.value;
        }
    }

    return (
        <div className="input__container">
            <input
                required
                type={props.type}
                value={handleValue()}
                onChange={handleChange()}
            />
            <label>{props.label}</label>
        </div>
    )
}

export default AuthInput