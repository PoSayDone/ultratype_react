import React, { Dispatch, FormEvent, useState } from 'react'
import Heading from '../../components/Heading/Heading'
import "./Login.scss"
import LoginButton from '../../components/LoginButton'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTypedSelector } from "../../hooks/useTypedSelector";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { motion } from 'framer-motion'
import AuthInput from '../../components/AuthInput/AuthInput'
import { useTranslation } from 'react-i18next'
import { useAuthUser, useSignIn } from 'react-auth-kit'
import AuthService from '../../services/AuthServices'
import { IUser } from '../../models/IUser'
import useAuthInput from '../../hooks/useAuthInput'

const Login = () => {

    const dispatch = useDispatch();

    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await AuthService.login(username, password);
            if (signIn({
                token: response.data.token,
                expiresIn: response.data.expiresIn,
                tokenType: "Bearer",
                authState: response.data.user,
            })) {
                dispatch({ type: "SET_USER", payload: response.data.user })
                if (location.state?.from) {
                    navigate(location.state.from)
                }
                else {
                    navigate("/")
                }
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleLogin(username.value, password.value)
    }

    const navigate = useNavigate();
    const location = useLocation();

    const { t, i18n } = useTranslation()
    const signIn = useSignIn();

    const username = useAuthInput('', { isEmpty: true, minLength: 3 })
    const password = useAuthInput('', { isEmpty: true, minLength: 8 })

    return (
        <motion.div className="container"
            initial={{ opacity: 0 }}
            animate={{ opacity: "100%" }}
            exit={{ opacity: 0 }}
        >
            <form className="auth-block" onSubmit={handleSubmit}>
                <Heading headingLevel={"h1"} className="auth-block__title">
                    {t("auth.login")}
                </Heading>
                <div className="auth-block__inputs">
                    <AuthInput label={t("auth.username")} type={'text'} value={username.value} onChange={e => username.onChange(e)} onBlur={e => username.onBlur(e)} />
                    {username.errorStringArray.map(errorString => {
                        if (username.isDirty)
                            return (
                                <div>{errorString}</div>
                            )
                    })}
                    <AuthInput label={t("auth.password")} type={'password'} value={password.value} onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} />
                    {password.errorStringArray.map(errorString => {
                        if (password.isDirty)
                            return (
                                <div>{errorString}</div>
                            )
                    })}
                </div>
                <LoginButton
                    disabled={(!username.inputValid || !password.inputValid)}
                    title={'Войти'}
                    icon={'arrow_right_alt'}
                />
                <div className="auth-block__register-text">
                    {t("auth.no_acc")} <Link to={'/registration'}>{t("auth.register")}</Link>
                </div>
            </form>
        </motion.div >
    )
}

export default Login