import { useState } from "react";
import Heading from "../Heading/Heading"

type Props = {
    text: string;
}

const Input = (props: Props) => {

    return (
        <div className="input__text">{props.text}</div>
    )
}

export default Input;