import { Dispatch, FormEvent, useState } from 'react'
import Heading from '../../components/Heading/Heading'
import LoginButton from '../../components/LoginButton'
import axios from "axios";
import { useDispatch } from "react-redux";
import { motion } from 'framer-motion'
import AuthInput from '../../components/AuthInput/AuthInput'
import { useSignIn } from 'react-auth-kit'
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthServices';
import "./Registration.scss"
import useAuthInput from '../../hooks/useAuthInput';

type Props = {}

const Registration = (props: Props) => {
    const dispatch = useDispatch();

    const email = useAuthInput('', { isEmpty: false, minLength: 0, isEmail: true })
    const username = useAuthInput('', { isEmpty: false, minLength: 3 })
    const password = useAuthInput('', { isEmpty: false, minLength: 8 })
    const passwordConfirm = useAuthInput('', { isEmpty: false, minLength: 0, isConfirm: true }, password.value)

    const handleRegistration = async (email: string, username: string, password: string) => {
        try {
            const response = await AuthService.register(email, username, password);
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
        handleRegistration(email.value, username.value, password.value)
    }

    const navigate = useNavigate();
    const location = useLocation();

    const { t, i18n } = useTranslation()
    const signIn = useSignIn();


    return (
        <motion.div className="container"
            initial={{ opacity: 0 }}
            animate={{ opacity: "100%" }}
            exit={{ opacity: 0 }}
        >
            <form className="auth-block" onSubmit={handleSubmit}>
                <Heading headingLevel={"h1"} className="auth-block__title">
                    Регистрация
                </Heading>
                <div className="auth-block__inputs">
                    <AuthInput label={t("auth.email")} type={'text'} value={email.value} onChange={event => email.onChange(event)} onBlur={event => email.onBlur(event)} />
                    {email.errorStringArray.map(errorString => {
                        if (email.isDirty)
                            return (
                                <div>{errorString}</div>
                            )
                    })}
                    <AuthInput label={t("auth.username")} type={'text'} value={username.value} onChange={event => username.onChange(event)} onBlur={event => username.onBlur(event)} />
                    {username.errorStringArray.map(errorString => {
                        if (username.isDirty)
                            return (
                                <div>{errorString}</div>
                            )
                    })}
                    <AuthInput label={t("auth.password")} type={'password'} value={password.value} onChange={event => password.onChange(event)} onBlur={event => password.onBlur(event)} />
                    {password.errorStringArray.map(errorString => {
                        if (password.isDirty)
                            return (
                                <div>{errorString}</div>
                            )
                    })}
                    <AuthInput label={t("auth.confirm_pass")} type={'password'} value={passwordConfirm.value} onChange={event => passwordConfirm.onChange(event)} onBlur={event => passwordConfirm.onBlur(event)} />
                    {passwordConfirm.errorStringArray.map(errorString => {
                        if (passwordConfirm.isDirty)
                            return (
                                <div>{errorString}</div>
                            )
                    })}
                </div>
                <LoginButton
                    title={t("auth.register")}
                    icon={'arrow_right_alt'}
                    disabled={!email.inputValid || !username.inputValid || !password.inputValid || !passwordConfirm.inputValid}
                />
                <div className="auth-block__register-text">
                    {t("auth.have_acc")} <Link to={'/login'}>{t("auth.login")}</Link>
                </div>
            </form>
        </motion.div >
    )
}

export default Registration