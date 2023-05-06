import { Dispatch, useState } from 'react'
import Heading from '../../components/Heading/Heading'
import LoginButton from '../../components/LoginButton'
import axios from "axios";
import { useDispatch } from "react-redux";
import { AuthAction, AuthActions } from "../../store/reducers/authReducer";
import { motion } from 'framer-motion'
import AuthInput from '../../components/AuthInput/AuthInput'
import { useSignIn } from 'react-auth-kit'
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {}

const Register = (props: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const { t, i18n } = useTranslation()
    const [usernameValue, setUsernameValue] = useState("")
    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("")
    const signIn = useSignIn();
    const dispatch: Dispatch<AuthActions> = useDispatch()

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
                <LoginButton title={'Зарегистрироваться'} icon={'arrow_right_alt'} onClick={register} />
            </div>
        </motion.div >
    )

    async function register() {
        const values = {
            email: emailValue,
            username: usernameValue,
            password: confirmPasswordValue
        }

        // Отправляем результаты на сервер
        const register = await axios
            .post("https://localhost:7025/users", values,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

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

export default Register