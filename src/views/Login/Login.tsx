import { motion } from 'framer-motion'
import React from 'react'
import Heading from '../../components/Heading/Heading'
import "./Login.scss"
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import {RegisterLink} from "./RegisterLink";

type Props = {
    title: string
}

const Login = (props: Props) => {
    return (
        <motion.div className="container">
            <div className="auth-block">
                <Heading headingLevel={"h1"} className="auth-block__title">
                    {props.title}
                </Heading>
                <div className="auth-block__inputs">
                    <div className="auth-block__input">
                        <input/>
                        <label>Username</label>
                    </div>
                    <div className="auth-block__input">
                        <input/>
                        <label>Passowrd</label>
                    </div>
                </div>
                <Button title = {props.title}/>
                {props.title === 'Вход' ? <RegisterLink/> : ""}
            </div>
        </motion.div>
    )
}

export default Login