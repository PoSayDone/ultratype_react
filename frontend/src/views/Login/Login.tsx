import {FormEvent, useState} from 'react'
import Heading from '../../components/Heading/Heading'
import "./Login.scss"
import LoginButton from '../../components/LoginButton'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useDispatch} from "react-redux";
import AuthInput from '../../components/AuthInput/AuthInput'
import {useTranslation} from 'react-i18next'
import {useSignIn} from 'react-auth-kit'
import AuthService from '../../services/AuthService'
import useAuthInput from '../../hooks/useAuthInput'
import AnimatedContainer from '../../components/AnimatedContainer'
import AnimatedDiv from '../../components/AnimatedDiv'

const Login = () => {

	const dispatch = useDispatch();
	const [errorLoginMessage, setErrorLoginMessage] = useState("")
	const handleLogin = async (username: string, password: string) => {
		try {
			const response = await AuthService.login(username, password);
			if (signIn({
				token: response.data.token,
				expiresIn: response.data.expiresIn,
				tokenType: "Bearer",
				authState: response.data.user,
			})) {
				dispatch({type: "SET_USER", payload: response.data.user})
				if (location.state?.from) {
					navigate(location.state.from)
				} else {
					navigate("/")
				}
			}
		} catch (e: any) {
			console.log(e.response?.data);
			switch (e.response.data){
				case "User not found":
					setErrorLoginMessage("Пользователь не найден")
					break
				case "Wrong password":
					setErrorLoginMessage("Неверный пароль")
					break;
				default:
					setErrorLoginMessage("Ошибка: попробуйте еще раз")
					break
			}
		}
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		handleLogin(username.value, password.value)
	}

	const navigate = useNavigate();
	const location = useLocation();

	const {t, i18n} = useTranslation()
	const signIn = useSignIn();

	const username = useAuthInput('', {isEmpty: true, minLength: 3})
	const password = useAuthInput('', {isEmpty: true, minLength: 8})

	return (
		<AnimatedContainer>
			<form className="auth-block" onSubmit={handleSubmit}>
				<Heading headingLevel={"h1"} className="auth-block__title">
					{t("auth.login")}
				</Heading>
				{errorLoginMessage != "" && <AnimatedDiv> <Heading headingLevel={"h2"} className="auth_block_error_message">{errorLoginMessage}</Heading></AnimatedDiv>}
				<div className="auth-block__inputs">
					<AuthInput
						label={t("auth.username")}
						type={'text'}
						value={username.value}
						onChange={e => {
							username.onChange(e)
							setErrorLoginMessage("")
						}}
						onBlur={e => username.onBlur(e)}/>
					{username.isDirty && username.inputValid == false ?
						<AnimatedDiv>{username.errorString}</AnimatedDiv> : ""}
					<AuthInput
						label={t("auth.password")}
						type={'password'}
						value={password.value}
						onChange={e => {
							password.onChange(e)
							setErrorLoginMessage("")
						}}
						onBlur={e => password.onBlur(e)}/>
					{password.isDirty && password.inputValid == false ?
						<AnimatedDiv>{password.errorString}</AnimatedDiv> : ""}
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
		</AnimatedContainer>
	)
}

export default Login