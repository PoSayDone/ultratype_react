import {motion} from 'framer-motion'
import React, {Dispatch, useState} from 'react'
import Heading from '../../components/Heading/Heading'
import "./Login.scss"
import Button from '../../components/Button'
import {Link} from 'react-router-dom'
import {RegisterLink} from "./RegisterLink";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import axios, {AxiosError} from "axios";
import {useDispatch} from "react-redux";
import {AuthAction, AuthActions} from "../../store/reducers/authReducer";

type Props = {
	title: string
}

const Login = (props: Props) => {
<<<<<<< HEAD
    return (
        <motion.div className="container"
            initial={{ opacity: 0 }}
            animate={{ opacity: "100%" }}
            exit={{ opacity: 0 }}
        >
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
                <Button text={'Войти'} icon={'arrow_right_alt'}/>
                <div className="auth-block__register-text">
                    Нет аккаунта? <Link to={'/register'}>Зарегистрируйтесь</Link>
                </div>
            </div>
        </motion.div>
    )
=======
	let Logged = useTypedSelector(state => state.login);
	const dispatch: Dispatch<AuthActions> = useDispatch()
	const [nameValue, setNameValue] = useState("")
	let [passwordValue, setPasswordValue] = useState("")
	return (
		<motion.div className="container" >
			<div className="auth-block">
				<Heading headingLevel={"h1"} className="auth-block__title">
					{props.title}
				</Heading>
				<div className="auth-block__inputs">
					<div className="auth-block__input">
						<input value={nameValue} onChange={event => setNameValue(event.target.value)}/>
						<label>Username</label>
					</div>
					<div className="auth-block__input">
						<input type="password"
						       value={passwordValue}
						       onChange={event => setPasswordValue(event.target.value)}
						/>
						<label>Passowrd</label>
					</div>
				</div>
				<Button title={props.title} onClick={GetAuth}/>
				{props.title === 'Вход' ? <RegisterLink/> : ""}
				{Logged.statusCode == 200 ? <Heading headingLevel={"h1"}>Успешно</Heading> : ""}
				{Logged.statusCode == 404 ? <Heading headingLevel={"h1"}>Пользователь не найден</Heading> : ""}
				{Logged.statusCode == 400 ? <Heading headingLevel={"h1"}>Неверный пароль</Heading> : ""}
			</div>
		</motion.div>
	)

	function GetAuth() {
		axios.get(`https://localhost:7025/auth/${nameValue}:${passwordValue}`)
			.then(res => {
				if (res.status == 200){
					dispatch({
						type: AuthAction.SET_USER_DATA,
						payload: {
							userName: nameValue,
							password: passwordValue
						}
					})
				}
			})
			.catch( error => {
				dispatch({
					type: AuthAction.SET_CODE,
					payload: error.response.status
				})
			})
	}
>>>>>>> refs/remotes/origin/develop
}

export default Login