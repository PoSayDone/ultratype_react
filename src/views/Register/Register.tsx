import { motion } from 'framer-motion'
import React from 'react'
import Heading from '../../components/Heading/Heading'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import "./Register.scss"

type Props = {}

const Register = (props: Props) => {
    return (
        <motion.div className="container"
            initial={{ opacity: 0 }}
            animate={{ opacity: "100%" }}
            exit={{ opacity: 0 }}
        >
            <div className="auth-block">
                <Heading headingLevel={"h1"} className="auth-block__title">
                    Регистрация
                </Heading>
                <div className="auth-block__inputs">
                    <div className="auth-block__input">
                        <input />
                        <label>Email</label>
                    </div>
                    <div className="auth-block__input">
                        <input />
                        <label>Username</label>
                    </div>
                    <div className="auth-block__input">
                        <input />
                        <label>Password</label>
                    </div>
                    <div className="auth-block__input">
                        <input />
                        <label>Confirm password</label>
                    </div>
                </div>
                <Button text={'Зарегистрироваться'} icon={'arrow_right_alt'} />
            </div>
        </motion.div >
    )
}

export default Register