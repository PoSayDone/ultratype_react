import React, { Dispatch, useState } from 'react'
import Heading from '../../components/Heading/Heading'
import "./Login.scss"
import LoginButton from '../../components/LoginButton'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTypedSelector } from "../../hooks/useTypedSelector";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { AuthAction, AuthActions } from "../../store/reducers/authReducer";
import { motion } from 'framer-motion'
import AuthInput from '../../components/AuthInput/AuthInput'
import { useTranslation } from 'react-i18next'
import { useAuthUser, useSignIn } from 'react-auth-kit'

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { t, i18n } = useTranslation()
    const signIn = useSignIn();
    let Logged = useTypedSelector(state => state.login);
    const dispatch: Dispatch<AuthActions> = useDispatch()
    const [nameValue, setNameValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")

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
                <LoginButton title={'Войти'} icon={'arrow_right_alt'} onClick={login} />
                <div className="auth-block__register-text">
                    {t("auth.no_acc")} <Link to={'/register'}>{t("auth.register")}</Link>
                </div>
            </div>
        </motion.div >
    )

    async function login() {

        const values = {
            username: nameValue, 
            password: passwordValue
        }

        // Отправляем результаты на сервер
        const res = await axios
            .post("https://localhost:7025/login", values,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

        if (signIn({
            token: res.data.token,
            expiresIn: res.data.expiresIn,
            tokenType: "Bearer",
            authState: res.data.username,
        })) {
            dispatch({
                type: AuthAction.SET_USER_DATA,
                payload: {
                    token: res.data.token,
                    username: res.data.username
                }
            })

            if (location.state?.from) {
                navigate(location.state.from)
            }
            else {
                navigate("/")
            }
        }
    }
}

export default Login