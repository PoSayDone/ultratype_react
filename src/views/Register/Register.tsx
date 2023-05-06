import { motion } from 'framer-motion'
import React from 'react'
import Heading from '../../components/Heading/Heading'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import "./Register.scss"
import AuthInput from '../../components/AuthInput/AuthInput'
import { t } from 'i18next'

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
                    <AuthInput label={t("auth.email")} type={'email'}/>
                    <AuthInput label={t("auth.username")} type={'text'}/>
                    <AuthInput label={t("auth.password")} type={'text'}/>
                    <AuthInput label={t("auth.confirm_pass")} type={'text'}/>
                </div>
                <Button title={'Зарегистрироваться'} icon={'arrow_right_alt'} onClick={undefined} />
            </div>
        </motion.div >
    )
}

export default Register