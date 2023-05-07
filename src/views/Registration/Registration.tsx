import { Dispatch, useState } from 'react'
import Heading from '../../components/Heading/Heading'
import LoginButton from '../../components/LoginButton'
import axios from "axios";
import { useDispatch } from "react-redux";
import { motion } from 'framer-motion'
import AuthInput from '../../components/AuthInput/AuthInput'
import { useSignIn } from 'react-auth-kit'
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthServices';
import "./Registration.scss"

type Props = {}

const Registration = (props: Props) => {
    const dispatch = useDispatch();
    const [usernameValue, setUsernameValue] = useState("")
    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")

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

    const handleClick = () => {
        handleRegistration(emailValue, usernameValue, passwordValue)
    }

    const navigate = useNavigate();
    const location = useLocation();

    const { t, i18n } = useTranslation()
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("")
    const signIn = useSignIn();


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
                    <AuthInput value={emailValue} onChange={event => setEmailValue(event.target.value)} label={t("auth.email")} type={'email'} />
                    <AuthInput value={usernameValue} onChange={event => setUsernameValue(event.target.value)} label={t("auth.username")} type={'text'} />
                    <AuthInput value={passwordValue} onChange={event => setPasswordValue(event.target.value)} label={t("auth.password")} type={'password'} />
                    <AuthInput value={confirmPasswordValue} onChange={event => setConfirmPasswordValue(event.target.value)} label={t("auth.confirm_pass")} type={'password'} />
                </div>
                <LoginButton title={'Зарегистрироваться'} icon={'arrow_right_alt'} onClick={handleClick} />
            </div>
        </motion.div >
    )
}

export default Registration