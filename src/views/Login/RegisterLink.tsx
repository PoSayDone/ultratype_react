import {Link} from "react-router-dom";
import React from "react";

export const RegisterLink = () => {
	return (
		<div className="auth-block__register-text">
			Нет аккаунта? <Link to={'/register'}>Зарегистрируйтесь</Link>
		</div>
	)
}