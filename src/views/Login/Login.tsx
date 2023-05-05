import { motion } from 'framer-motion'
import React from 'react'
import Heading from '../../components/Heading/Heading'
import "./Login.scss"
import Button from '../../components/Button'
import { Link } from 'react-router-dom'

type Props = {}

const Login = (props: Props) => {
    return (
        <motion.div className="container">
            <div className="auth-block">
                <Heading headingLevel={"h1"} className="auth-block__title">
                    Вход
                </Heading>
                <div className="auth-block__inputs">
                    <div className="auth-block__input">
                        <input/>
                        <label>Username</label>
                    </div>
                    <div className="auth-block__input">
                        <input/>
                        <label>Username</label>
                    </div>
                </div>
                <Button/>
                <div className="auth-block__register-text">
                    Нет аккаунта? <Link to={'/register'}>Зарегистрируйтесь</Link>
                </div>
            </div>
        </motion.div>
    )
}

export default Login