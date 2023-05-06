import React, { Dispatch, useState } from 'react'
import Heading from '../../components/Heading/Heading'
import "./Login.scss"
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import { useTypedSelector } from "../../hooks/useTypedSelector";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { AuthAction, AuthActions } from "../../store/reducers/authReducer";
import { motion } from 'framer-motion'
import AuthInput from '../../components/AuthInput/AuthInput'
import { useTranslation } from 'react-i18next'
import { useAuthUser, useSignIn } from 'react-auth-kit'

const Login = () => {
    const { t, i18n } = useTranslation()
    const signIn = useSignIn();
    let Logged = useTypedSelector(state => state.login);
    const dispatch: Dispatch<AuthActions> = useDispatch()
    const [nameValue, setNameValue] = useState("")
    let [passwordValue, setPasswordValue] = useState("")

    return (
        <motion.div className="container"
            initial={{ opacity: 0 }}
            animate={{ opacity: "100%" }}
            exit={{ opacity: 0 }}
        >
            <div className="auth-block">
                <Heading headingLevel={"h1"} className="auth-block__title">
                    {t("auth.login")}
                </Heading>
                <div className="auth-block__inputs">
                    <AuthInput label={t("auth.username")} type={'text'} value={nameValue} onChange={event => setNameValue(event.target.value)} />
                    <AuthInput label={t("auth.password")} type={'password'} value={passwordValue} onChange={event => setPasswordValue(event.target.value)} />
                </div>
                <Button title={'Войти'} icon={'arrow_right_alt'} onClick={GetAuth} />
                <div className="auth-block__register-text">
                    {t("auth.no_acc")} <Link to={'/register'}>{t("auth.register")}</Link>
                </div>
                {/* {Logged.statusCode == 200 ? <Heading headingLevel={"h1"}>Успешно</Heading> : ""}
                {Logged.statusCode == 404 ? <Heading headingLevel={"h1"}>Пользователь не найден</Heading> : ""}
                {Logged.statusCode == 400 ? <Heading headingLevel={"h1"}>Неверный пароль</Heading> : ""} */}
            </div>
        </motion.div>
    )

    async function GetAuth() {
        const login = {
            username: nameValue,
            password: passwordValue
        }
        // Отправляем результаты на сервер
        const res = await axios
            .post("https://localhost:7025/login", login,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

        signIn({
            token: res.data.token,
            expiresIn: res.data.expiresIn,
            tokenType: "Bearer",
            authState: res.data.username,
        })
    }
}

export default Login