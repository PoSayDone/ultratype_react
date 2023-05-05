
export enum AuthAction{
	SET_AUTH = "SET_AUTH",
	SET_CODE = "SET_CODE",
	SET_USER_DATA = "SET_USER_DATA"
}

interface SetAuthAction{
	type: AuthAction.SET_AUTH,
	payload: boolean
}

interface SetUserData{
	type: AuthAction.SET_USER_DATA,
	payload: {
		userName: string,
		password: string
	}
}

interface SetCodeAction{
	type: AuthAction.SET_CODE,
	payload: number
}

interface AuthState{
	isAuth: boolean,
	statusCode: number,
	userName: string,
	password: string
}
const defaultState : AuthState = {
	isAuth: false,
	statusCode: 0,
	userName: "",
	password: ""
}

export type AuthActions = SetAuthAction | SetCodeAction | SetUserData
export function authReducer(state = defaultState, action: AuthActions) : AuthState{
	switch (action.type){
		case AuthAction.SET_AUTH:
			return {
				...state,
				isAuth : action.payload
			}
		case AuthAction.SET_CODE:
			return {
				...state,
				statusCode: action.payload
			}
		case AuthAction.SET_USER_DATA:
			return {
				...state,
				isAuth: true,
				statusCode: 200,
				password: action.payload.password,
				userName: action.payload.userName
			}
		default:
			return state;
	}
}